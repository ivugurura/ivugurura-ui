import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl, Grid, InputLabel, Input, FormHelperText,
} from '@mui/material';

// const initialStates = {
//   title: '', type: '', albumId: '', author: '', actionDate: '', mediaLink: '',
// };
export const AddEditMedia = ({ open, onClose }) => {
  // const [media, setMedia] = React.useState(initialStates);
  console.log('AddEditMedia');
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new media</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Media: a file that can be (songs, preachings). Audio, video, images.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">We will never share your email.</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => {}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
