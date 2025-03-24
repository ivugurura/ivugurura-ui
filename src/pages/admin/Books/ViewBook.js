import React from 'react';

import { Dialog } from '@mui/material';

import { PdfViewerV3 } from '../../../common/components/PDFViewerV3';

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
      {/* <EmbedPDF
        mode="inline"
        style={{ width: 900, height: 800 }}
        documentURL={`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`}
        companyIdentifier="viewer"
      /> */}
      {/* <iframe
        id="pdfFrame"
        title={book.name}
        src={`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`}
        width="100%"
        height="600px"
      /> */}
      <PdfViewerV3
        pdfUrl={`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`}
        onPageClose={onClose}
        downloadParams={{ useMutation: 'useDownloadBookMutation', id: book.id }}
      />
    </Dialog>
  );
};
