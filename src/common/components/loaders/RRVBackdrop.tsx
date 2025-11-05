import { Backdrop, CircularProgress } from '@mui/material';

interface RRVBackdropProps {
  isOpen: boolean;
}

export const RRVBackdrop = ({ isOpen }:RRVBackdropProps) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isOpen}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);
