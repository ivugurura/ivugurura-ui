import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

import { RRVTable } from '../../../common/components/RRVTable/Table';
import { useMuiSearchPagination } from '../../../common/hooks/useMuiSearchPagination';
import { notifier } from '../../../helpers/utils/constants';
import { actions } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { allAudioColumns } from '../MediaEditor/schema';

const langs = [
  { id: 1, name: 'Kinyarwanda' },
  { id: 2, name: 'English' },
  { id: 3, name: 'French' },
  { id: 4, name: 'Kiswahili' },
];
const albums = [
  { id: 2, name: 'Indirimbo', lang: 1, author: 'Abagorozi' },
  { id: 4, name: 'Songs', lang: 2, author: 'Reformers' },
  { id: 5, name: 'Chancons', lang: 3, author: 'Reformateurs' },
  { id: 7, name: 'Nyimbo', lang: 4, author: 'Wanamatengenezo' },
];
export const SyncAudios = ({ open, onClose }) => {
  const [diffAudios, setDiffAudios] = useState([]);
  const [syncAssets, syncRes] = actions.useSyncAssetsMediaMutation();
  const { paginator, ...tableProps } = useMuiSearchPagination(1, 300);
  const {
    data,
    isFetching,
    isSuccess,
    refetch: refetchMedia,
  } = actions.useListAllAudiosQuery(paginator);
  const { data: filesRes, isFetching: fetchingFiles } =
    actions.useGetResourcesMediaQuery({
      resourceType: 'audio',
    });
  const { data: audioFiles } = filesRes || initials.dataArr;
  const { data: audios } = data || initials.dataArr;

  useEffect(() => {
    if (audioFiles.length && isSuccess) {
      const processed = [];
      audioFiles.forEach((file) => {
        const theAud = audios.find((a) => a.mediaLink === file.fileName);
        if (!theAud) {
          const title = file.fileName.split('-')[0] || '';
          processed.push({ ...file, title });
        }
      });
      setDiffAudios(processed);
    }
  }, [audioFiles.length, audios.length, isSuccess]);

  useEffect(() => {
    if (syncRes.isSuccess) {
      const { succeeded, failed } = syncRes.data.data;
      const message = `Succeeded:${succeeded}, failed:${failed}`;

      notifier.success(message);
      refetchMedia();
      syncRes.reset();
    }
  });

  const handleInputChange =
    (item, field) =>
    ({ target: { value } }) => {
      const audiosCp = [...diffAudios];
      const currIdx = audiosCp.findIndex(
        (aud) => aud.fileName === item.fileName,
      );
      if (currIdx !== -1) {
        let current = audiosCp[currIdx];
        current = { ...current, [field]: value };
        if (field === 'languageId') {
          const { id, author } = albums.find((a) => a.lang === value);
          current = { ...current, albumId: id, author };
        }
        audiosCp[currIdx] = current;
      }
      setDiffAudios(audiosCp);
    };

  const handleSync = () => {
    const assets = diffAudios.map((da) => ({
      type: 'audio',
      title: da.title,
      mediaLink: da.fileName,
      author: da.author,
      actionDate: new Date(),
      languageId: da.languageId,
      albumId: da.albumId,
    }));

    if (!diffAudios.length) return;
    syncAssets({ assets });
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Sync the lost audio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          While migrating the server some data has lost include audios. The
          modal wil help us to bring them back
          <Typography variant="h4">
            Total records. Files: {audioFiles.length}, Audios: {audios.length}
          </Typography>
        </DialogContentText>
        <RRVTable
          columns={allAudioColumns(handleInputChange, langs, albums)}
          data={diffAudios}
          isLoading={isFetching || fetchingFiles}
          {...tableProps}
          rowCount={diffAudios.length}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={syncRes.isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={syncRes.isLoading} onClick={handleSync}>
          {syncRes.isLoading ? 'Saving,...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
