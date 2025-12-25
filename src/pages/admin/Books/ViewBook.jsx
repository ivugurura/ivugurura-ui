import { Dialog } from '@mui/material';

import { PdfViewer } from '../../../common/components/PDFViewer/pdf';

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
      <PdfViewer
        pdfUrl={`${import.meta.env.VITE_API_URL}/api/v1/books/${book.id}`}
        downloadParams={{ useMutation: 'useDownloadBookMutation', id: book.id }}
      />
    </Dialog>
  );
};
