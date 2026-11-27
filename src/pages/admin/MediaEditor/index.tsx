import { useEffect, useState } from 'react';

import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';
import moment from 'moment';
import AudioPlayer from 'react-h5-audio-player';

import { RRVTable } from '../../../common/components/RRVTable/Table';
import { useMuiSearchPagination } from '../../../common/hooks/useMuiSearchPagination';
import { toAssetPath } from '../../../helpers/utils/constants';
import { actions, type QueryHook } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { DashboardContainer } from '../components/DashboardContainer';

import { AddEditTopic } from './AddEditAlbum';
import { AddEditMedia } from './AddEditMedia';
import { audioColumns } from './schema';

interface MediaAudio extends APP.IAudio {
  language?: { name: string };
  album?: { name: string };
}

interface IAlbum {
  id: string;
  name: string;
}

interface CurrentAudio {
  index: number;
  audio: MediaAudio | null;
}

type EditorStateKey = 'openAlbum' | 'openMedia';

const initialEditorStates: Record<EditorStateKey, boolean> = {
  openAlbum: false,
  openMedia: false,
};
const MediaEditor = () => {
  const [currentAudio, setCurrentAudio] = useState<CurrentAudio>({
    index: -1,
    audio: null,
  });
  const [editorState, setEditorState] = useState(initialEditorStates);
  const { paginator, ...tableProps } = useMuiSearchPagination();

  const useListAudios = actions.useListAudiosQuery as unknown as QueryHook<
    MediaAudio[],
    typeof paginator
  >;
  const useGetAlbums = actions.useGetAlbumsMediaQuery as unknown as QueryHook<
    IAlbum[],
    void
  >;
  const { data, isFetching, refetch: refetchMedia } = useListAudios(paginator);
  const { data: albumData, refetch } = useGetAlbums();
  const { data: audios, totalItems } = data || initials.dataArr<MediaAudio>();

  useEffect(() => {
    if (audios?.length > 0) {
      setCurrentAudio({ index: 0, audio: audios[0] });
    }
  }, [audios]);

  const handleOpenEditor = (type: EditorStateKey) => {
    setEditorState((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const { data: albums } = albumData || initials.dataArr<IAlbum>();
  const { audio } = currentAudio;
  return (
    <DashboardContainer
      title="All media"
      action={
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => handleOpenEditor('openMedia')}>
            Add new media
          </Button>
          <Button onClick={() => handleOpenEditor('openAlbum')}>
            Add new album
          </Button>
        </ButtonGroup>
      }
    >
      <AddEditTopic
        open={editorState.openAlbum}
        onClose={() => handleOpenEditor('openAlbum')}
        refetchAlbums={refetch}
      />
      <AddEditMedia
        open={editorState.openMedia}
        onClose={() => handleOpenEditor('openMedia')}
        albums={albums}
        refetchMedia={refetchMedia}
      />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RRVTable
            columns={audioColumns()}
            data={audios}
            isLoading={isFetching}
            {...tableProps}
            rowCount={totalItems}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          {audio && (
            <Card>
              <AudioPlayer
                src={toAssetPath(audio.mediaLink, false)}
                onPlay={() => {
                  /* no-op */
                }}
              />
              <CardHeader
                title={audio.title}
                subheader={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      by {audio.author}
                    </Typography>
                    {` — Language: ${audio.language?.name}, Album: ${audio.album?.name}`}
                  </>
                }
              />
              <CardContent>{audio.language?.name}</CardContent>
              <CardContent>
                {moment(audio.actionDate).format('dddd, MMM D, YYYY')}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default MediaEditor;
