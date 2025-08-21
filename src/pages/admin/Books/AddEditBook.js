import React, { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';

import { RRVDialogActions } from '../../../common/components/RRVDialogActions';
import { RRVForm } from '../../../common/components/RRVForm/index';
import { actions, initials } from '../../../redux/apiSliceBuilder';

import { bookSchema, bookInitials } from './schema';

export const AddEditBook = ({ open, onClose, refetchBooks }) => {
  const [newBook, setNewBook] = useState(bookInitials);
  const [createBook, res] = actions.useCreateBookMutation();
  const { data } = actions.useListCategoriesBookQuery();

  const { data: bookCategories } = data || initials.dataArr;
  const filePathName = useSelector((state) => state.filer.fileName);

  useEffect(() => {
    if (res.isSuccess) {
      refetchBooks();
      onClose();
    }
  }, [res.isSuccess]);
  useEffect(() => {
    if (filePathName) {
      setNewBook((prev) => ({ ...prev, bookFile: filePathName }));
    }
  }, [filePathName]);

  const handleSaveBook = () => {
    createBook(newBook);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new book</DialogTitle>
      <DialogContent>
        <RRVForm
          fields={bookSchema(bookCategories)}
          states={newBook}
          setStates={setNewBook}
        />
      </DialogContent>
      <RRVDialogActions
        onClose={onClose}
        onSave={handleSaveBook}
        isLoading={res.isLoading}
      />
    </Dialog>
  );
};
