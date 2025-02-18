import React, { useState } from 'react';

import { Button } from '@mui/material';

import { BooksList } from '../../../common/components/BooksList';
import { useAlertDialog } from '../../../common/hooks/useAlertDialog';
import { useMuiSearchPagination } from '../../../common/hooks/useMuiSearchPagination';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { AddEditBook } from './AddEditBook';
import { ViewBook } from './ViewBook';

const Books = () => {
  const [currentBook, setCurrentBook] = useState({});
  const [openModals, setOpenModals] = useState({
    addBook: false,
    readBook: false,
  });
  const { paginator } = useMuiSearchPagination();
  const { data, refetch } = actions.useListBooksQuery(paginator);
  const [deleteBook, delRes] = actions.useDeleteBookMutation();

  const { alertValues, reset, setAlertValues } = useAlertDialog();

  const handleModal = (type, value) => {
    setOpenModals((p) => ({ ...p, [type]: value }));
  };

  const handleBookClick = (book, action) => {
    setCurrentBook(book);
    if (action === 'read') {
      handleModal('readBook', true);
    } else if (action === 'delete') {
      setAlertValues({
        open: true,
        title: 'Delete book',
        message: 'Are you sure you want to delete this book?',
        actionType: 'delete',
      });
    }
  };

  const handleConfirm = () => {
    if (alertValues.actionType === 'delete') {
      deleteBook({ id: currentBook.id });
    }
  };

  const { data: books } = data || initials.dataArr;

  return (
    <DashboardContainer
      title="Library books"
      action={
        <Button onClick={() => handleModal('addBook', true)}>
          Add new book
        </Button>
      }
    >
      <BooksList books={books} onBookClick={handleBookClick} />
      <AddEditBook
        open={openModals.addBook}
        onClose={() => handleModal('addBook', false)}
        refetchBooks={refetch}
      />
      <ViewBook
        open={openModals.readBook}
        onClose={() => handleModal('readBook', false)}
        book={currentBook}
      />
      <AlertConfirm
        {...alertValues}
        setOpen={() => reset()}
        onConfirmYes={handleConfirm}
        loading={delRes.isLoading}
      />
    </DashboardContainer>
  );
};

export default Books;
