import * as React from 'react';

import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@mui/material';

import { actions } from '../../../redux/actions';

export const AddEditTopic = ({ open, onClose }) => {
  const [createAlbum, newAlbumRes] = actions.useCreateAlbumMediaQuery();
  console.log(newAlbumRes, createAlbum);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new album</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Type album name"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};
