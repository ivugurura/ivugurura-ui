import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { NavBar } from '../navbar';

export const MainLayout = () => (
  <Box>
    <NavBar />
    <Outlet />
  </Box>
);
