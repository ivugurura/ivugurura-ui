import React from 'react';

import { Dialog } from '@mui/material';

import { PdfViewerV3 } from '../../../common/components/PDFViewerV3';
import { actions } from '../../../redux/apiSliceBuilder';

export const ViewBook = ({
  book = {},
  open,
  onClose = () => {},
  fullScreen = false,
}) => {
  const [downloadBook, res] = actions.useDownloadBookMutation();
  console.log(`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`);

  React.useEffect(() => {
    if (book.id && res.isSuccess) {
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${book.name}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  }, [res.isSuccess, book.id]);
  if (!book.id) return null;
  console.log(res);

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
        onDownload={() => downloadBook({ id: book.id })}
      />
    </Dialog>
  );
};
