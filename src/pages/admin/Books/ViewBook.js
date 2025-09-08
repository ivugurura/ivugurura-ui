import React from 'react';

import { Dialog } from '@mui/material';

import { PdfViewerChrome } from '../../../common/components/PDFViewer';

export const ViewBook = ({
  book = {},
  open,
  onClose = () => {},
  fullScreen = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={fullScreen}
    >
      <PdfViewerChrome
        pdfUrl={`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`}
        onPageClose={onClose}
        downloadParams={{ useMutation: 'useDownloadBookMutation', id: book.id }}
        watermarkText="Reformation Voice"
        initialScale={1}
      />
    </Dialog>
  );
};
