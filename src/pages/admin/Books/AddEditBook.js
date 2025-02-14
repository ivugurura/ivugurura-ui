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
import { actions, initials } from '../../../redux/apiSliceBuilder';

import { bookSchema, bookInitials } from './schema';

export const AddEditBook = ({ open, onClose, refetchBooks }) => {
  const [newBook, setNewBook] = useState(bookInitials);
  const [fileUrls, setFileUrls] = useState({ bookFile: '', bookCover: '' });
  const [fileType, setFileType] = useState('');
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
    if (fileType && filePathName) {
      setFileUrls((prev) => ({ ...prev, [fileType]: filePathName }));
    }
  }, [fileType, filePathName]);
  const handleFileInputClick = (type) => {
    setFileType(type);
  };

  const handleSaveBook = () => {
    createBook({ ...newBook, fileUrls });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new book</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Book: It will appear on top of the web navigation.
        </DialogContentText>
        <RRVForm
          fields={bookSchema(handleFileInputClick, bookCategories)}
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
