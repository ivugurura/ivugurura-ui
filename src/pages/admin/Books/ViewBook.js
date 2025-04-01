import React from 'react';

import { Dialog } from '@mui/material';

import { PdfViewerV3 } from '../../../common/components/PDFViewer';

export const ViewBook = ({
  book = {},
  open,
  onClose = () => {},
  fullScreen = false,
}) => {
  console.log(`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={fullScreen}
    >
      <PdfViewerV3
        pdfUrl={`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`}
        onPageClose={onClose}
        downloadParams={{ useMutation: 'useDownloadBookMutation', id: book.id }}
      />
    </Dialog>
  );
};
