import React, { useState } from 'react';

import { BooksList } from '../../../common/components/BooksList';
import { DashboardContainer } from '../components/DashboardContainer';

const initialBooks = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description:
      'A classic novel about racial injustice in the American South.',
    coverImage: '/api/placeholder/200/300',
    genre: 'Fiction',
    publishedYear: 1960,
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    description:
      'A dystopian novel exploring totalitarianism and government surveillance.',
    coverImage: '/api/placeholder/200/300',
    genre: 'Dystopian Fiction',
    publishedYear: 1949,
  },
];
const Books = () => {
  const [openBookModal, setOpenBookModal] = useState(false);

  return (
    <DashboardContainer title="Library books">
      <BooksList books={initialBooks} />
    </DashboardContainer>
  );
};

export default Books;
