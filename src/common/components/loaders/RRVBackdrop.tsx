import React from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

interface RRVBackdropProps {
  isOpen: boolean;
}

export const RRVBackdrop: React.FC<RRVBackdropProps> = ({ isOpen }) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isOpen}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);
