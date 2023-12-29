import React, { useEffect } from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { RRVForm } from '../../../common/components/RRVForm';
import { mediaSchema } from '../../../helpers/formSchemas/media';
import { actions } from '../../../redux/apiSliceBuilder';

const initialStates = {
  title: '',
  type: 'audio',
  albumId: '',
  author: '',
  actionDate: moment().format('YYYY-MM-DD'),
};
export const AddEditMedia = ({
  open, onClose, albums, refetchMedia,
}) => {
  const [media, setMedia] = React.useState(initialStates);
  const filePathName = useSelector((state) => state.filer.fileName);
  const [createMedia, newMediaRes] = actions.useCreateAudioMutation();
  useEffect(() => {
    if (newMediaRes.success) {
      onClose();
      setMedia(initialStates);
      newMediaRes.reset();
      refetchMedia();
    }
  }, [newMediaRes.success]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new media</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Media: a file that can be (songs, preachings). Audio, video, images.
        </DialogContentText>
        <RRVForm fields={mediaSchema(albums)} states={media} setStates={setMedia} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => createMedia({ ...media, mediaLink: filePathName })}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
