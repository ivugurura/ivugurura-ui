import React, { useEffect, useRef, useState } from 'react';

import {
  ArrowBackOutlined as ArrowBackIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
  ViewSidebar as SidebarIcon,
} from '@mui/icons-material';
import {
  IconButton,
  Button,
  TextField,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { generateSignature } from '../../../helpers/utils/constants';
import { useWindowSize } from '../../hooks/useWindowSize';
import { RRVDownloadBtn } from '../RRVDownloadBtn';

// PdfViewerChrome: chrome-like responsive pdf viewer using pdf.js
export const PdfViewerChrome = ({
  pdfUrl,
  onPageClose = () => {},
  downloadParams = {},
  watermarkText = '',
  initialScale = 1,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [pdfDoc, setPdfDoc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(initialScale);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const thumbsRef = useRef(null);
  const thumbsBuiltRef = useRef(false);
  const thumbsGenRef = useRef(0);

  const { breakpoint } = useWindowSize();

  useEffect(() => setSidebarOpen(breakpoint !== 'small'), [breakpoint]);

  const applyWatermark = (canvas, text) => {
    if (!text) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.font = `${Math.min(width, height) / 14}px Arial`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 6);
    const fontSize = parseInt(ctx.font, 10) || 24;
    const gap = fontSize * 4;
    const repeats = Math.ceil(Math.sqrt(width * width + height * height) / gap);
    for (let i = -repeats; i <= repeats; i++) ctx.fillText(text, 0, i * gap);
    ctx.restore();
  };

  //   highlight a thumbnail and scroll it into view
  const highlightThumbnail = (page) => {
    if (!thumbsRef.current) return;
    Array.from(thumbsRef.current.children).forEach((child) => {
      const node = child;
      if (node.dataset && Number(node.dataset.page) === page) {
        node.style.background = '#e3f2fd';
        node.style.border = '1px solid #1976d2';
      } else {
        node.style.background = '';
        node.style.border = '1px solid transparent';
      }
    });
  };

  const renderPage = (doc, pageNum, scaleOverride) => {
    if (!doc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    doc.getPage(pageNum).then((page) => {
      const actualScale =
        typeof scaleOverride === 'number' ? scaleOverride : scale;
      const vp = page.getViewport({ scale: actualScale });
      const ratio = window.devicePixelRatio || 1;
      console.log({ vp, ratio });
      canvas.width = Math.round(vp.width * ratio);
      canvas.height = Math.round(vp.height * ratio);
      canvas.style.width = '100%';
      canvas.style.maxWidth = `${Math.round(vp.width)}px`;
      canvas.style.height = `${Math.round(vp.height) - 120}px`;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      page.render({ canvasContext: ctx, viewport: vp }).promise.then(() => {
        if (watermarkText) applyWatermark(canvas, watermarkText);
      });
    });
  };

  const buildThumbnails = (doc) => {
    if (!thumbsRef.current) return;
    // increment generation to invalidate any previous pending renders
    thumbsGenRef.current += 1;
    const gen = thumbsGenRef.current;
    thumbsRef.current.innerHTML = '';
    thumbsBuiltRef.current = true;
    for (let i = 1; i <= doc.numPages; i++) {
      doc.getPage(i).then((page) => {
        const thumb = document.createElement('canvas');
        const ctx = thumb.getContext('2d');
        const vp = page.getViewport({ scale: 0.12 });
        thumb.width = Math.round(vp.width);
        thumb.height = Math.round(vp.height);
        page.render({ canvasContext: ctx, viewport: vp }).promise.then(() => {
          // If generation changed, skip appending this thumbnail (stale build)
          if (thumbsGenRef.current !== gen) return;
          const wrapper = document.createElement('div');
          wrapper.style.cursor = 'pointer';
          wrapper.style.margin = '6px';
          wrapper.dataset.page = String(i);
          // basic non-selected style
          wrapper.style.border = '1px solid transparent';
          wrapper.style.padding = '4px';
          wrapper.className = 'pdf-thumb-wrap';
          wrapper.appendChild(thumb);
          const label = document.createElement('div');
          label.textContent = i;
          label.style.fontSize = '11px';
          label.style.textAlign = 'center';
          wrapper.appendChild(label);
          wrapper.onclick = () => {
            setCurrentPage(i);
            renderPage(doc, i, scale || 1);
            // highlight selected
            highlightThumbnail(i);
          };
          thumbsRef.current.appendChild(wrapper);
        });
      });
    }
  };

  // when sidebar opens or pdfDoc changes, ensure thumbnail list is built and scrolled to current
  useEffect(() => {
    if (sidebarOpen && pdfDoc) {
      // build only once per document
      if (!thumbsBuiltRef.current) {
        requestAnimationFrame(() => {
          buildThumbnails(pdfDoc);
          setTimeout(() => {
            if (thumbsRef.current) {
              const el = thumbsRef.current.querySelector(
                `[data-page="${currentPage}"]`,
              );
              if (el && typeof el.scrollIntoView === 'function') {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              highlightThumbnail(currentPage);
            }
          }, 120);
        });
      } else {
        // already built: just highlight/scroll
        setTimeout(() => {
          if (thumbsRef.current) {
            const el = thumbsRef.current.querySelector(
              `[data-page="${currentPage}"]`,
            );
            if (el && typeof el.scrollIntoView === 'function') {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            highlightThumbnail(currentPage);
          }
        }, 60);
      }
    }
  }, [sidebarOpen, pdfDoc, currentPage]);

  // ensure when page changes we update the selected thumb and scroll into view
  useEffect(() => {
    if (!thumbsRef.current) return;
    setTimeout(() => {
      const el = thumbsRef.current.querySelector(
        `[data-page="${currentPage}"]`,
      );
      if (el && typeof el.scrollIntoView === 'function')
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      Array.from(thumbsRef.current.children).forEach((child) => {
        const node = child;
        if (node.dataset && Number(node.dataset.page) === currentPage)
          node.classList.add('selected');
        else node.classList.remove('selected');
      });
    }, 60);
  }, [currentPage]);

  const loadPdf = (url) => {
    if (!window['pdfjs-dist/build/pdf']) {
      setLoadingMessage('PDF library not loaded');
      return;
    }
    setLoadingMessage('Loading document...');
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    const { timestamp, hash } = generateSignature();
    pdfjsLib
      .getDocument({
        url,
        httpHeaders: { 'X-Timestamp': timestamp, 'X-Signature': hash },
        withCredentials: true,
      })
      .promise.then((doc) => {
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setIsLoaded(true);
        setLoadingMessage('Preparing pages...');
        setTimeout(() => renderPage(doc, currentPage, scale), 50);
        // reset thumbnails built flag for new document
        thumbsBuiltRef.current = false;
        if (sidebarOpen) buildThumbnails(doc);
        setLoadingMessage('');
      })
      .catch((err) => {
        console.error('Error loading PDF:', err);
        setLoadingMessage('Could not load document');
      });
  };

  useEffect(() => {
    if (pdfUrl) loadPdf(pdfUrl);
    return () => {
      setPdfDoc(null);
      setIsLoaded(false);
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (pdfDoc) renderPage(pdfDoc, currentPage, scale);
  }, [currentPage, scale, sidebarOpen]);

  useEffect(() => {
    const onResize = () => {
      if (pdfDoc) renderPage(pdfDoc, currentPage, scale);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [pdfDoc, currentPage, scale]);

  const { useMutation, ...otherParams } = downloadParams;

  const onZoomIn = () => setScale((s) => Math.min(3, s + 0.25));
  const onZoomOut = () => setScale((s) => Math.max(0.25, s - 0.25));

  const handlePageChange = (value) => {
    const p = Number(value);
    setCurrentPage(Math.min(Math.max(1, p), totalPages || p));
  };

  // console.log({ breakpoint });

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 0.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.up('md')]: { gap: 1 },
          }}
        >
          <Button
            onClick={onPageClose}
            startIcon={<ArrowBackIcon />}
            size="small"
          >
            Back
          </Button>
          <IconButton
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            title="Previous page"
          >
            <PrevIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages || p, p + 1))
            }
            title="Next page"
          >
            <NextIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              size="small"
              value={currentPage}
              onChange={(e) => handlePageChange(e.target.value)}
              inputProps={{ style: { width: 48, textAlign: 'center' } }}
            />
            <Box
              component="span"
              sx={{ fontSize: 13 }}
            >{`of ${totalPages || '-'}`}</Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={onZoomOut} title="Zoom out">
            <ZoomOutIcon />
          </IconButton>
          <IconButton onClick={onZoomIn} title="Zoom in">
            <ZoomInIcon />
          </IconButton>
          {breakpoint !== 'small' && (
            <IconButton
              onClick={() => setSidebarOpen((s) => !s)}
              title="Toggle thumbnails"
            >
              <SidebarIcon />
            </IconButton>
          )}
          <RRVDownloadBtn
            useMutation={useMutation}
            params={otherParams}
            hideBtntext={isMobile}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          mt: 1,
          height: '78vh',
        }}
      >
        <Box
          component="aside"
          ref={thumbsRef}
          sx={{
            display: sidebarOpen ? 'block' : 'none',
            width: 160,
            overflowY: 'auto',
            p: 1,
            borderRight: '1px solid #eee',
            background: '#fafafa',
          }}
        />

        <Box
          component="main"
          ref={containerRef}
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
            background: '#e7e7e7',
          }}
        >
          {isLoaded ? (
            <canvas
              ref={canvasRef}
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                background: 'white',
                marginTop: 12,
              }}
            />
          ) : (
            <Box sx={{ p: 2 }}>{loadingMessage || 'Preparing document...'}</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PdfViewerChrome;
