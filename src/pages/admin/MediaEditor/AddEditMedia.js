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

const fields = (albums = []) => [
  [
    {
      label: 'Media title',
      name: 'title',
      helperText: 'Name of the media',
    },
  ],
  [
    {
      label: 'Media type',
      name: 'type',
      select: true,
      options: [{ value: 'audio', label: 'Audio' }],
      helperText: 'Type of the media',
    },
    {
      label: 'Media album',
      name: 'albumId',
      select: true,
      options: albums,
      labelSelector: 'id',
      valueSelector: 'name',
      helperText: 'Select media album',
    },
  ],
];
export const AddEditMedia = ({ open, onClose, albums }) => {
  // const [media, setMedia] = React.useState(initialStates);
  console.log('AddEditMedia', albums);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new media</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Media: a file that can be (songs, preachings). Audio, video, images.
        </DialogContentText>
        <RRVForm fields={fields(albums)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => {}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
