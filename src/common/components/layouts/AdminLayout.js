import React from 'react';

import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { HomeDashboard } from '../../../pages/admin';

export const AdminLayout = () => (
  <Box>
    <h2>Admin layout</h2>
    <Routes>
      <Route index element={<HomeDashboard />} />
    </Routes>
  </Box>
);
