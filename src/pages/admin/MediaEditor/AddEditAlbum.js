import * as React from 'react';

import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@mui/material';

import { actions } from '../../../redux/actions';

export const AddEditTopic = ({ open, onClose, refetchAlbums }) => {
  const [createAlbum, newAlbumRes] = actions.useCreateAlbumMediaMutation();
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    if (newAlbumRes.isSuccess) {
      onClose();
      setName('');
      refetchAlbums();
      newAlbumRes.reset();
    }
  }, [newAlbumRes.isSuccess]);
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
