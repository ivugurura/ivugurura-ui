import React, { useState } from 'react';

import { Button } from '@mui/material';

import { BooksList } from '../../../common/components/BooksList';
import { useMuiSearchPagination } from '../../../common/hooks/useMuiSearchPagination';
import { actions, initials } from '../../../redux/apiSliceBuilder';
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

  const handleModal = (type, value) => {
    setOpenModals((p) => ({ ...p, [type]: value }));
  };
  const handleOpenBook = (book) => {
    setCurrentBook(book);
    handleModal('readBook', true);
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
      <BooksList books={books} onBookClick={handleOpenBook} />
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
    </DashboardContainer>
  );
};

export default Books;
