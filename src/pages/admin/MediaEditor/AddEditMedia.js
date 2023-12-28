import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import moment from 'moment';

import { RRVForm } from '../../../common/components/RRVForm';
import { mediaSchema } from '../../../helpers/formSchemas/media';

const initialStates = {
  title: '',
  type: 'audio',
  albumId: '',
  author: '',
  actionDate: moment().format('YYYY-MM-DD'),
};
export const AddEditMedia = ({ open, onClose, albums }) => {
  const [media, setMedia] = React.useState(initialStates);
  console.log('AddEditMedia', media);
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
        <Button onClick={() => {}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
