import React, { useEffect } from 'react';

import { Dialog } from '@mui/material';

export const ViewBook = ({ book = {}, open, onClose }) => {
  if (!book.id) return null;
  console.log(`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`);

  useEffect(() => {
    const disableShortcuts = (event) => {
      if (event.ctrlKey && (event.key === 's' || event.key === 'p')) {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', disableShortcuts);
    return () => document.removeEventListener('keydown', disableShortcuts);
  }, []);

  useEffect(() => {
    const hideToolbar = () => {
      const iframe = document.getElementById('pdfFrame');
      if (!iframe) return;

      iframe.onload = () => {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) return;

        // Hide the toolbar
        const toolbar = iframeDoc.querySelector('#toolbar');
        if (toolbar) toolbar.style.display = 'none';

        // Hide the download & print buttons if they exist
        const downloadBtn = iframeDoc.querySelector("button[title='Download']");
        if (downloadBtn) downloadBtn.style.display = 'none';

        const printBtn = iframeDoc.querySelector("button[title='Print']");
        if (printBtn) printBtn.style.display = 'none';
      };
    };

    hideToolbar();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <iframe
        id="pdfFrame"
        title={book.name}
        src={`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`}
        width="100%"
        height="600px"
      />
    </Dialog>
  );
};
