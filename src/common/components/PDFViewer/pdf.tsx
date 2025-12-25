import React from 'react';

import { Box, Typography } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import type {
  OnDocumentLoadSuccess,
  Options,
} from 'react-pdf/dist/shared/types.js';

import { generateSignature } from '../../../helpers/utils/constants';
import { RRVDownloadBtn } from '../RRVDownloadBtn';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.mjs`;

interface PdfViewerProps {
  pdfUrl: string;
  onPageClose?: () => void;
  downloadParams?: Record<string, string>;
  watermarkText?: string;
  initialScale?: number;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  downloadParams = {},
}) => {
  const [numPages, setNumPages] = React.useState(0);
  const [pageWidth, setPageWidth] = React.useState(700);
  const onDocumentLoadSuccess: OnDocumentLoadSuccess = (ev) => {
    setNumPages(ev.numPages);
  };
  const { useMutation, ...otherParams } = downloadParams;
  const { timestamp, hash } = generateSignature();
  const options: Options = {
    httpHeaders: { 'X-Timestamp': timestamp, 'X-Signature': hash },
    withCredentials: true,
  };
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <RRVDownloadBtn useMutation={useMutation} params={otherParams} />
      </Box>
      <Document
        file={pdfUrl}
        options={options}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div>Loading PDF...</div>}
        error={<div>Failed to load PDF</div>}
      >
        {Array.from(new Array(numPages), (el, index) => {
          const pageNumber = index + 1;
          return (
            <Box
              key={`page_${pageNumber}`}
              sx={{
                position: 'relative',
                display: 'inline-block',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                marginBottom: numPages > 1 ? 0.8 : 0,
                '&:last-child': {
                  marginBottom: 0,
                },
              }}
            >
              <Page
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={Math.min(pageWidth, window.innerWidth * 0.8)}
                onLoadSuccess={(page) => {
                  if (pageNumber === 1) {
                    setPageWidth(page.width);
                  }
                }}
              />

              {numPages > 1 && (
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    zIndex: 10,
                  }}
                >
                  Page {pageNumber} of {numPages}
                </Typography>
              )}
            </Box>
          );
        })}
      </Document>
    </Box>
  );
};
