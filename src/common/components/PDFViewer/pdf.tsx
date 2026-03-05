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
  Drawer,
  IconButton,
  Paper,
  Skeleton,
  TextField,
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

interface PdfViewerProps {
  pdfUrl: string;
  onPageClose?: () => void;
  downloadParams?: Record<string, unknown>;
  watermarkText?: string;
  initialScale?: number;
  canDownload?: boolean;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  downloadParams = {},
  canDownload = true,
  initialScale = 1,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [numPages, setNumPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageInputValue, setPageInputValue] = React.useState('1');
  const [showThumbs, setShowThumbs] = React.useState(!isMobile);
  const [zoom, setZoom] = React.useState(initialScale);
  const [fitToWidth, setFitToWidth] = React.useState(true);
  const [rotation, setRotation] = React.useState(0);
  const [viewportWidth, setViewportWidth] = React.useState(900);
  const [naturalPageWidth, setNaturalPageWidth] = React.useState<number | null>(
    null,
  );

  const viewportRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setShowThumbs(!isMobile);
  }, [isMobile]);

  React.useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      setViewportWidth(Math.max(300, Math.floor(entry.contentRect.width)));
    });

    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    setPageInputValue(String(currentPage));
  }, [currentPage]);

  const signature = React.useMemo(() => generateSignature(), []);

  const docOptions = React.useMemo<Options>(
    () => ({
      httpHeaders: {
        'X-Timestamp': String(signature.timestamp),
        'X-Signature': signature.hash,
      },
      withCredentials: true,
    }),
    [signature],
  );

  const onDocumentLoadSuccess: OnDocumentLoadSuccess = ({
    numPages: total,
  }) => {
    setNumPages(total);
    setCurrentPage(1);
    setPageInputValue('1');
  };

  const goToPage = React.useCallback(
    (page: number) => {
      const nextPage = clamp(page, 1, Math.max(1, numPages));
      setCurrentPage(nextPage);
    },
    [numPages],
  );

  const handleThumbnailClick = (page: number) => {
    goToPage(page);
    if (isMobile) {
      setShowThumbs(false);
    }
  };

  const commitPageInput = () => {
    const next = Number.parseInt(pageInputValue, 10);
    if (Number.isNaN(next)) {
      setPageInputValue(String(currentPage));
      return;
    }
    goToPage(next);
  };

  const zoomIn = () => {
    setFitToWidth(false);
    setZoom((previous) => clamp(Number((previous + 0.1).toFixed(2)), 0.5, 4));
  };

  const zoomOut = () => {
    setFitToWidth(false);
    setZoom((previous) => clamp(Number((previous - 0.1).toFixed(2)), 0.5, 4));
  };

  const rotateLeft = () => {
    setRotation((previous) => (previous - 90 + 360) % 360);
  };

  const rotateRight = () => {
    setRotation((previous) => (previous + 90) % 360);
  };

  const { useMutation, ...otherParams } = downloadParams as {
    useMutation?: string;
    [key: string]: unknown;
  };

  const mainPageWidth = fitToWidth
    ? Math.max(300, Math.floor(viewportWidth - 48))
    : undefined;

  const zoomPercent = fitToWidth
    ? Math.round(
        naturalPageWidth && naturalPageWidth > 0
          ? (Math.max(300, Math.floor(viewportWidth - 48)) / naturalPageWidth) *
              100
          : 100,
      )
    : Math.round(zoom * 100);

  const thumbnails = (
    <Box
      sx={{
        width: { xs: 220, sm: 170 },
        height: '100%',
        overflowY: 'auto',
        p: 1,
        bgcolor: 'background.default',
      }}
    >
      {Array.from({ length: numPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;
        return (
          <Box
            key={`thumb-${page}`}
            role="button"
            onClick={() => handleThumbnailClick(page)}
            sx={{
              mb: 1,
              p: 0.5,
              border: '1px solid',
              borderColor: isActive ? 'primary.main' : 'divider',
              borderRadius: 1,
              cursor: 'pointer',
              bgcolor: isActive ? 'action.selected' : 'background.paper',
            }}
          >
            <Page
              pageNumber={page}
              width={isMobile ? 190 : 148}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              rotate={rotation}
            />
            <Typography
              variant="caption"
              sx={{ display: 'block', mt: 0.5, textAlign: 'center' }}
            >
              {page}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Document
      file={pdfUrl}
      options={docOptions}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={
        <Box sx={{ p: 2, width: '100%' }}>
          <Skeleton variant="rounded" height={44} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={420} sx={{ mb: 1.5 }} />
          <Skeleton variant="rounded" height={18} width="32%" />
        </Box>
      }
      error={
        <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body1">Unable to load PDF.</Typography>
          <Typography variant="caption">
            Please check network access and permissions.
          </Typography>
        </Box>
      }
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          minHeight: 560,
          maxHeight: '86vh',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        {!isMobile && showThumbs && (
          <Box
            sx={{
              width: 170,
              borderRight: '1px solid',
              borderColor: 'divider',
            }}
          >
            {thumbnails}
          </Box>
        )}

        {isMobile && (
          <Drawer
            anchor="left"
            open={showThumbs}
            onClose={() => setShowThumbs(false)}
            ModalProps={{ keepMounted: true }}
          >
            {thumbnails}
          </Drawer>
        )}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              px: 1,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              flexWrap: 'wrap',
              position: 'sticky',
              top: 0,
              zIndex: 2,
              bgcolor: 'background.paper',
            }}
          >
            <Tooltip title={showThumbs ? 'Hide thumbnails' : 'Show thumbnails'}>
              <IconButton
                size="small"
                onClick={() => setShowThumbs((previous) => !previous)}
              >
                <ViewSidebarIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <Tooltip title="First page">
              <span>
                <IconButton
                  size="small"
                  onClick={() => goToPage(1)}
                  disabled={currentPage <= 1}
                >
                  <FirstPageIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Previous page">
              <span>
                <IconButton
                  size="small"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  <PrevPageIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>

            <TextField
              size="small"
              value={pageInputValue}
              onChange={(event) => setPageInputValue(event.target.value)}
              onBlur={commitPageInput}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  commitPageInput();
                }
              }}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                style: { width: 52, textAlign: 'center' },
              }}
            />

            <Typography variant="body2" color="text.secondary">
              / {numPages || '-'}
            </Typography>

            <Tooltip title="Next page">
              <span>
                <IconButton
                  size="small"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={numPages === 0 || currentPage >= numPages}
                >
                  <NextPageIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Last page">
              <span>
                <IconButton
                  size="small"
                  onClick={() => goToPage(numPages)}
                  disabled={numPages === 0 || currentPage >= numPages}
                >
                  <LastPageIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <Tooltip title="Zoom out">
              <IconButton size="small" onClick={zoomOut}>
                <ZoomOutIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Typography
              variant="body2"
              sx={{ minWidth: 46, textAlign: 'center' }}
            >
              {zoomPercent}%
            </Typography>

            <Tooltip title="Zoom in">
              <IconButton size="small" onClick={zoomIn}>
                <ZoomInIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={fitToWidth ? 'Disable fit to width' : 'Fit to width'}
            >
              <IconButton
                size="small"
                onClick={() => setFitToWidth((previous) => !previous)}
              >
                <FitScreenIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <Tooltip title="Rotate left">
              <IconButton size="small" onClick={rotateLeft}>
                <RotateLeftIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Rotate right">
              <IconButton size="small" onClick={rotateRight}>
                <RotateRightIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Box sx={{ flex: 1 }} />

            {canDownload && (
              <RRVDownloadBtn
                useMutation={useMutation}
                params={otherParams}
                hideBtntext
              />
            )}
          </Paper>

          <Box
            ref={viewportRef}
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              bgcolor: 'grey.100',
            }}
          >
            <Page
              pageNumber={Math.max(1, currentPage)}
              width={mainPageWidth}
              scale={fitToWidth ? undefined : zoom}
              rotate={rotation}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onLoadSuccess={(page) => {
                setNaturalPageWidth(page.width);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Document>
  );
};
