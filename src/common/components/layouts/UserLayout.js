import React from 'react';

import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { Home } from '../../../app/Home';
import { PageRoutes } from '../../../RoutesConstants';

export const UserLayout = () => (
  <Box>
    <h2>Users layout</h2>
    <Routes>
      <Route index element={<Home />} />
      <Route path="topics" element={<h2>All topics</h2>} />
      <Route path={PageRoutes.Topic} element={<h2>Topic details</h2>} />
    </Routes>
  </Box>
);
