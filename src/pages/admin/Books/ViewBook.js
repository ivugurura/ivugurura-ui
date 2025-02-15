import React from 'react';

import { Dialog } from '@mui/material';

export const ViewBook = ({ book = {}, open, onClose }) => {
  if (!book.id) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      <iframe
        title={book.name}
        src={`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`}
        width="100%"
        height="600px"
      />
    </Dialog>
  );
};
