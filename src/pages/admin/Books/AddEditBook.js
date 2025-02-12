import React, { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { RRVDialogActions } from '../../../common/components/RRVDialogActions';
import { RRVForm } from '../../../common/components/RRVForm/index';
import { actions } from '../../../redux/apiSliceBuilder';

import { bookSchema, bookInitials } from './schema';

export const AddEditBook = ({ open, onClose, refetchBooks }) => {
  const [newBook, setNewBook] = useState(bookInitials);
  const [createBook, res] = actions.useCreateBookMutation();
  const [fileUrls, setFileUrls] = useState({ bookFile: '', bookCover: '' });
  const [fileType, setFileType] = useState('');
  const filePathName = useSelector((state) => state.filer.fileName);

  useEffect(() => {
    if (res.isSuccess) {
      refetchBooks();
      onClose();
    }
  }, [res.isSuccess]);
  useEffect(() => {
    if (fileType && filePathName) {
      setFileUrls((prev) => ({ ...prev, [fileType]: filePathName }));
    }
  }, [fileType, filePathName]);
  const handleFileInputClick = (type) => {
    setFileType(type);
  };

  console.log(fileUrls, fileType);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new book</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Book: It will appear on top of the web navigation.
        </DialogContentText>
        <RRVForm
          fields={bookSchema(handleFileInputClick)}
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
