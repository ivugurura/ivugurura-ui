import React, { useState, useEffect, useRef } from 'react';

export const PdfViewerV2 = ({ pdfUrl }) => {
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    // Import PDF.js library dynamically
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js';
    script.async = true;

    // Set up worker
    script.onload = () => {
      const pdfjsLib = window['pdfjs-dist/build/pdf'];
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';
    };

    document.body.appendChild(script);

    // Add CSS
    const link = document.createElement('link');
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf_viewer.min.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);

    // Clean up
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  const renderPage = (pdfDoc, container, pageNumber, scale, resolution) => {
    pdfDoc.getPage(pageNumber).then((page) => {
      // Create Canvas element and append to the Container
      const canvas = document.createElement('canvas');
      canvas.id = `pdf-${pageNumber}`;
      const ctx = canvas.getContext('2d');
      container.appendChild(canvas);

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

  const loadPdfFromUrl = (url) => {
    // Ensure PDF.js is loaded
    if (!window['pdfjs-dist/build/pdf']) {
      console.error('PDF.js library not loaded yet');
      return;
    }

    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    const scale = 1; // Set Scale for zooming PDF
    const resolution = 1; // Set Resolution to Adjust PDF clarity

    // Read PDF from URL
    pdfjsLib
      .getDocument(url)
      .promise.then((pdfDoc) => {
        // Clear previous content
        if (pdfContainerRef.current) {
          pdfContainerRef.current.innerHTML = '';
        }

        setIsPdfLoaded(true);

        // Loop and render all pages
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          renderPage(pdfDoc, pdfContainerRef.current, i, scale, resolution);
        }
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
    <div
      ref={pdfContainerRef}
      style={{
        background: '#ccc',
        textAlign: 'center',
        display: isPdfLoaded ? 'block' : 'none',
        padding: '5px',
        overflow: 'auto',
      }}
    />
  );
};
