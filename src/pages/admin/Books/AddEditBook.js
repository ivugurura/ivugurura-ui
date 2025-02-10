import React, { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { RRVDialogActions } from '../../../common/components/RRVDialogActions';
import { RRVForm } from '../../../common/components/RRVForm/index';
import { actions } from '../../../redux/apiSliceBuilder';

import { bookSchema, bookInitials } from './schema';

export const AddEditBook = ({ open, onClose, refetchBooks }) => {
  const [newBook, setNewBook] = useState(bookInitials);
  const [createBook, res] = actions.useCreateBookMutation();

  useEffect(() => {
    if (res.isSuccess) {
      refetchBooks();
      onClose();
    }
  }, [res.isSuccess]);
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
