import React from 'react';

import { Dialog } from '@mui/material';

import { PdfViewer } from '../../../common/components/PDFViewer';

interface ViewBookProps {
  book?: APP.IBook;
  open: boolean;
  onClose?: () => void;
  fullScreen?: boolean;
}

export const ViewBook: React.FC<ViewBookProps> = ({
  book,
  open,
  onClose,
  fullScreen = false,
}) => {
  if (!book?.id) {
    return null;
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={fullScreen}
    >
      <PdfViewer
        pdfUrl={`${import.meta.env.VITE_API_URL}/api/v1/books/${book?.id}`}
        canDownload={book?.isDownloadable}
        initialScale={1}
        downloadParams={{
          useMutation: 'useDownloadBookMutation',
          id: book?.id,
          fileName: book?.name,
        }}
      />
    </Dialog>
  );
};
