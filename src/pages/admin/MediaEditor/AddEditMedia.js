import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { RRVForm } from '../../../common/components/RRVForm';

const fields = [
  [
    {
      label: 'Media title',
      name: 'title',
      helperText: 'Name of the media',
    },
  ],
];
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
        <RRVForm fields={fields} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => {}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
