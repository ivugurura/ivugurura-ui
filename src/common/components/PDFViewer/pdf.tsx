import React from 'react';

import {
  FirstPage as FirstPageIcon,
  FitScreen as FitScreenIcon,
  LastPage as LastPageIcon,
  NavigateNext as NextPageIcon,
  NavigateBefore as PrevPageIcon,
  RotateLeft as RotateLeftIcon,
  RotateRight as RotateRightIcon,
  ViewSidebar as ViewSidebarIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import type {
  OnDocumentLoadSuccess,
  Options,
} from 'react-pdf/dist/shared/types.js';

import { generateSignature } from '../../../helpers/utils/constants';
import { RRVDownloadBtn } from '../RRVDownloadBtn';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.mjs`;

/**
 * PdfViewer component
 *
 * Props:
 * - pdfUrl: URL to the PDF resource
 * - downloadParams: params forwarded to `RRVDownloadBtn` mutation action
 * - canDownload: when false, the download button is hidden to disallow downloads
 * - onPageClose, watermarkText, initialScale: reserved for future use
 */
interface PdfViewerProps {
  pdfUrl: string;
  onPageClose?: () => void;
  downloadParams?: Record<string, string>;
  watermarkText?: string;
  initialScale?: number;
  canDownload?: boolean;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  downloadParams = {},
  canDownload = true,
  initialScale = 1,
}) => {
  const [numPages, setNumPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [basePageWidth, setBasePageWidth] = React.useState<number>(0);
  const [containerWidth, setContainerWidth] = React.useState<number>(800);
  const [scale, setScale] = React.useState<number>(initialScale);
  const [fitToWidth, setFitToWidth] = React.useState<boolean>(true);
  const [rotation, setRotation] = React.useState<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showThumbs, setShowThumbs] = React.useState<boolean>(!isMobile);

  const viewerRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!viewerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cw = entry.contentRect.width;
        setContainerWidth(Math.max(300, cw));
      }
    });
    ro.observe(viewerRef.current);
    return () => ro.disconnect();
  }, []);
  const onDocumentLoadSuccess: OnDocumentLoadSuccess = (ev) => {
    setNumPages(ev.numPages);
    setCurrentPage(1);
  };

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(p, 1), numPages || 1);
    setCurrentPage(next);
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.1, 5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.1, 0.2));
  const toggleFit = () => setFitToWidth((v) => !v);
  const rotateLeft = () => setRotation((r) => (r - 90 + 360) % 360);
  const rotateRight = () => setRotation((r) => (r + 90) % 360);

  const { useMutation, ...otherParams } = downloadParams;
  const signature = React.useMemo(() => generateSignature(), []);
  const options: Options = React.useMemo(
    () => ({
      httpHeaders: {
        'X-Timestamp': String(signature.timestamp),
        'X-Signature': signature.hash,
      },
      withCredentials: true,
    }),
    [signature],
  );
  const effectiveScale =
    fitToWidth && basePageWidth > 0 ? containerWidth / basePageWidth : scale;

  const widthForFit = fitToWidth
    ? Math.max(300, Math.floor(containerWidth - 32))
    : undefined;
  console.log({ isMobile });

  return (
    <Document
      file={pdfUrl}
      options={options}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={
        <Box sx={{ p: 2, width: '100%' }}>
          <Skeleton variant="rounded" height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={180} sx={{ mb: 1 }} />
          <Skeleton variant="rounded" height={24} width="40%" />
        </Box>
      }
      error={
        <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Unable to load PDF.
          </Typography>
          <Typography variant="caption">
            Please check your network or permissions and try again.
          </Typography>
        </Box>
      }
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          height: '100%',
          minHeight: 400,
        }}
      >
        {/* Sidebar Thumbnails */}
        {!isMobile && (
          <Box
            sx={{
              width: 160,
              borderRight: '1px solid',
              borderColor: 'divider',
              p: 1,
              overflowY: 'auto',
              height: '100vh',
            }}
          >
            {Array.from({ length: numPages || 0 }, (_, i) => (
              <Box
                key={`thumb_${i + 1}`}
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border:
                    i + 1 === currentPage
                      ? '2px solid #1976d2'
                      : '1px solid #ddd',
                }}
                onClick={() => goToPage(i + 1)}
              >
                <Page
                  pageNumber={i + 1}
                  width={150}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
                <Typography
                  variant="caption"
                  sx={{ display: 'block', textAlign: 'center', py: 0.5 }}
                >
                  {i + 1}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Main area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Toolbar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1,
              py: 0.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Tooltip title="First page">
              <span>
                <IconButton
                  onClick={() => goToPage(1)}
                  disabled={currentPage <= 1}
                >
                  <FirstPageIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Previous">
              <span>
                <IconButton
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  <PrevPageIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Typography variant="body2">
              Page {currentPage} / {numPages || '-'}
            </Typography>
            <Tooltip title="Next">
              <span>
                <IconButton
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= numPages}
                >
                  <NextPageIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Last page">
              <span>
                <IconButton
                  onClick={() => goToPage(numPages)}
                  disabled={currentPage >= numPages}
                >
                  <LastPageIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            <Tooltip title="Zoom out">
              <IconButton onClick={zoomOut}>
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="body2">
              {Math.round(effectiveScale * 100)}%
            </Typography>
            <Tooltip title="Zoom in">
              <IconButton onClick={zoomIn}>
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={fitToWidth ? 'Disable fit to width' : 'Fit to width'}
            >
              <IconButton onClick={toggleFit}>
                <FitScreenIcon />
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            <Tooltip title="Rotate left">
              <IconButton onClick={rotateLeft}>
                <RotateLeftIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Rotate right">
              <IconButton onClick={rotateRight}>
                <RotateRightIcon />
              </IconButton>
            </Tooltip>

            <Box sx={{ flex: 1 }} />

            <Tooltip title={showThumbs ? 'Hide thumbnails' : 'Show thumbnails'}>
              <IconButton onClick={() => setShowThumbs((v) => !v)}>
                <ViewSidebarIcon />
              </IconButton>
            </Tooltip>

            {canDownload && (
              <RRVDownloadBtn
                useMutation={useMutation}
                params={otherParams}
                hideBtntext
              />
            )}
          </Box>

          {/* Page viewer */}
          <Box
            ref={viewerRef}
            sx={{
              flex: 1,
              overflow: 'auto',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <Page
              pageNumber={currentPage}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={widthForFit ? undefined : effectiveScale}
              width={widthForFit}
              rotate={rotation}
              onLoadSuccess={(page) => {
                if (!basePageWidth) setBasePageWidth(page.width);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Document>
  );
};
