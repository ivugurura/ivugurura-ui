import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { NavBar } from '../navbar';

export const AppLayout = () => (
  <Box>
    <NavBar />
    <Outlet />
  </Box>
);
