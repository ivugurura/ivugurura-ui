import React from 'react';

import { Box, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

export const AdminLayout = () => (
  <Box>
    <Typography>Admin routes</Typography>
    <Routes>
      <Route index element={<h2>Admin landing page</h2>} />
      <Route path="topics" element={<h2>All topics</h2>} />
    </Routes>
  </Box>
);
