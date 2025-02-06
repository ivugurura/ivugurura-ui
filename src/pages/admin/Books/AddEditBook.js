import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { RRVDialogActions } from '../../../common/components/RRVDialogActions';
import { RRVForm } from '../../../common/components/RRVForm/index';
import { actions } from '../../../redux/apiSliceBuilder';

const initials = {
  title: '',
  author: '',
  cover: '',
  description: '',
  categoryId: '',
  audio: '',
};
export const AddEditBook = ({ open, onClose, refetchBooks }) => {
  const [newBook, setNewBook] = useState(initials);
  const [createBook, res] = actions.useCreateBookMutation();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new book</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Book: It will appear on top of the web navigation.
        </DialogContentText>
        <RRVForm
          fields={bookSchema()}
          states={newBook}
          setStates={setNewBook}
        />
      </DialogContent>
      <RRVDialogActions
        onClose={onClose}
        onSave={() => {
          createBook(newBook);
        }}
        isLoading={res.isLoading}
      />
    </Dialog>
  );
};
