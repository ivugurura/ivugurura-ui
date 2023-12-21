/* eslint-disable no-unused-vars */
import * as React from 'react';

import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@mui/material';

import { actions } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';

export const AddEditTopic = ({ open, onClose }) => {
  const [createAlbum, newAlbumRes] = actions.useCreateAlbumMediaMutation();
  const [name, setName] = React.useState('');
  const { data, refetch } = actions.useGetAlbumsMediaQuery();
  const { data: albums } = data || initials.dataArr;

  React.useEffect(() => {
    if (newAlbumRes.success) {
      onClose();
      setName('');
      refetch();
      newAlbumRes.reset();
    }
  }, [newAlbumRes.success]);
  console.log(albums);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new album</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Albums: a folder of media files that can help you organize
          your media(songs, preachings). Audio, video, images.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Type album name"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => createAlbum({ name })}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
