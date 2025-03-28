import React, { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import dayjs from 'dayjs';

import { RRVDialogActions } from '../../../common/components/RRVDialogActions';
import { RRVForm } from '../../../common/components/RRVForm';
import { actions } from '../../../redux/apiSliceBuilder';

import { pubSchema } from './schema';

const initialStates = {
  title: 'Communique',
  content: '',
  isPublished: false,
  expiryDate: dayjs(),
  minDate: dayjs(),
};
export const AddEditPublic = ({ open, onClose, refetchPubs }) => {
  const [newPub, setNewPub] = useState(initialStates);
  const [createPub, res] = actions.useCreatePubConfigMutation();

  useEffect(() => {
    if (res.isSuccess) {
      res.reset();
      refetchPubs();
      onClose();
      setNewPub(initialStates);
    }
  }, [res.isSuccess]);

  const handleSave = () => {
    const { expiryDate, minDate, ...rest } = newPub;
    createPub({ ...rest, expiryDate: dayjs(expiryDate).format('YYYY-MM-DD') });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new communication to our audience</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Communication: It will appear on top of the web navigation.
        </DialogContentText>
        <RRVForm fields={pubSchema()} states={newPub} setStates={setNewPub} />
      </DialogContent>
      <RRVDialogActions
        onClose={onClose}
        onSave={handleSave}
        isLoading={res.isLoading}
      />
    </Dialog>
  );
};
