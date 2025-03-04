/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useRef } from 'react';

import { Button } from '@mui/material';

export const PdfViewerV3 = ({ pdfUrl, onPageClose = () => {} }) => {
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);
  //   const [pdfDocument, setPdfDocument] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pdfContainerRef = useRef(null);
  const thumbnailsContainerRef = useRef(null);

  // useEffect(() => {
  //   // Import PDF.js library dynamically
  //   const script = document.createElement('script');
  //   script.src =
  //     'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js';
  //   script.async = true;

  //   // Set up worker
  //   script.onload = () => {
  //     const pdfjsLib = window['pdfjs-dist/build/pdf'];
  //     pdfjsLib.GlobalWorkerOptions.workerSrc =
  //       'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';
  //   };

  //   document.body.appendChild(script);

  //   // Add CSS
  //   const link = document.createElement('link');
  //   link.href =
  //     'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf_viewer.min.css';
  //   link.rel = 'stylesheet';
  //   link.type = 'text/css';
  //   document.head.appendChild(link);

  //   // Clean up
  //   return () => {
  //     document.body.removeChild(script);
  //     document.head.removeChild(link);
  //   };
  // }, []);

  const renderPage = (pdfDoc, container, pageNumber, scale, resolution) => {
    pdfDoc.getPage(pageNumber).then((page) => {
      // Create a div to wrap the page (for scrolling to specific pages)
      const pageDiv = document.createElement('div');
      pageDiv.id = `page-${pageNumber}`;
      pageDiv.className = 'pdf-page';
      container.appendChild(pageDiv);

      // Create Canvas element and append to the page div
      const canvas = document.createElement('canvas');
      canvas.id = `pdf-canvas-${pageNumber}`;
      const ctx = canvas.getContext('2d');
      pageDiv.appendChild(canvas);

      // Create and add empty DIV to add SPACE between pages
      const spacer = document.createElement('div');
      spacer.style.height = '20px';
      container.appendChild(spacer);

      // Set the Canvas dimensions using ViewPort and Scale
      const viewport = page.getViewport({ scale });
      canvas.height = resolution * viewport.height;
      canvas.width = resolution * viewport.width;

      // Render the PDF page
      const renderContext = {
        canvasContext: ctx,
        viewport,
        transform: [resolution, 0, 0, resolution, 0, 0],
      };

      page.render(renderContext);
    });
  };

  const renderThumbnail = (pdfDoc, container, pageNumber) => {
    pdfDoc.getPage(pageNumber).then((page) => {
      // Create thumbnail container
      const thumbContainer = document.createElement('div');
      thumbContainer.className = 'thumbnail-container';
      thumbContainer.style.cursor = 'pointer';
      thumbContainer.style.margin = '5px 0';
      thumbContainer.style.border = '1px solid #ddd';
      thumbContainer.style.position = 'relative';

      // Add page number label
      const pageLabel = document.createElement('div');
      pageLabel.textContent = pageNumber;
      pageLabel.style.position = 'absolute';
      pageLabel.style.bottom = '5px';
      pageLabel.style.right = '5px';
      pageLabel.style.background = 'rgba(0,0,0,0.5)';
      pageLabel.style.color = 'white';
      pageLabel.style.padding = '2px 5px';
      pageLabel.style.borderRadius = '3px';
      pageLabel.style.fontSize = '10px';

      // Create Canvas for thumbnail
      const canvas = document.createElement('canvas');
      canvas.id = `thumbnail-${pageNumber}`;
      canvas.width = '100%';
      const ctx = canvas.getContext('2d');

      // Add click event to scroll to the page
      thumbContainer.onclick = () => {
        setCurrentPage(pageNumber);
        document
          .getElementById(`page-${pageNumber}`)
          .scrollIntoView({ behavior: 'smooth' });

        // Highlight the selected thumbnail
        const thumbnails = container.querySelectorAll('.thumbnail-container');
        thumbnails.forEach((thumb) => {
          thumb.style.backgroundColor = '';
          thumb.style.boxShadow = '';
        });

        thumbContainer.style.backgroundColor = '#f0f0f0';
        thumbContainer.style.boxShadow = '0 0 5px #0066cc';
      };

      thumbContainer.appendChild(canvas);
      thumbContainer.appendChild(pageLabel);
      container.appendChild(thumbContainer);

      // Set thumbnail scale (smaller than the main view)
      const thumbnailScale = 0.16;
      const viewport = page.getViewport({ scale: thumbnailScale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render the thumbnail
      const renderContext = {
        canvasContext: ctx,
        viewport,
      };

      page.render(renderContext);
    });
  };

  const renderAllPages = (pdfDoc) => {
    if (!pdfContainerRef.current || !thumbnailsContainerRef.current) return;
    console.log('pdfContainerRef.current', pdfContainerRef.current);

    const scale = 1; // Set Scale for zooming PDF
    const resolution = 1; // Set Resolution to Adjust PDF clarity

    // Loop and render all pages
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      renderPage(pdfDoc, pdfContainerRef.current, i, scale, resolution);
      renderThumbnail(pdfDoc, thumbnailsContainerRef.current, i);
    }
  };

  const loadPdfFromUrl = (url) => {
    // Ensure PDF.js is loaded
    if (!window['pdfjs-dist/build/pdf']) {
      console.error('PDF.js library not loaded yet');
      return;
    }

    const pdfjsLib = window['pdfjs-dist/build/pdf'];

    // Read PDF from URL
    pdfjsLib
      .getDocument(url)
      .promise.then((pdfDoc) => {
        // Clear previous content
        if (pdfContainerRef.current) {
          pdfContainerRef.current.innerHTML = '';
        }

        if (thumbnailsContainerRef.current) {
          thumbnailsContainerRef.current.innerHTML = '';
        }

        // setPdfDocument(pdfDoc);
        setTotalPages(pdfDoc.numPages);
        setIsPdfLoaded(true);

        // Render all pages and thumbnails
        renderAllPages(pdfDoc);
      })
      .catch((error) => {
        console.error('Error loading PDF:', error);
      });
  };

  useEffect(() => {
    if (pdfUrl) {
      loadPdfFromUrl(pdfUrl);
    }
  }, [pdfUrl]);

  return (
    <div>
      <Button onClick={onPageClose}>Close</Button>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        {/* Thumbnails sidebar */}
        <div
          ref={thumbnailsContainerRef}
          style={{
            width: '150px',
            backgroundColor: '#f5f5f5',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '820px',
            padding: '10px',
            borderRight: '1px solid #ddd',
          }}
        />

        {/* Main PDF container */}
        <div
          ref={pdfContainerRef}
          style={{
            flex: 1,
            background: '#ccc',
            textAlign: 'center',
            padding: '5px',
            overflow: 'auto',
          }}
        />
      </div>

      {isPdfLoaded && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
        </div>
      )}
    </div>
  );
};
