import { Backdrop, CircularProgress } from '@mui/material';

export const RRVBackdrop = ({ isOpen }) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isOpen}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);
