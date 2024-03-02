import React from 'react';

import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { Home } from '../../../pages/Home';
import { TopicDetailPage } from '../../../pages/TopicDetails';
import { TopicsPage } from '../../../pages/TopicsPage';
import { PageRoutes } from '../../../RoutesConstants';

export const UserLayout = () => (
  <Box>
    <h2>Users layout</h2>
    <Routes>
      <Route index element={<Home />} />
      <Route path={PageRoutes.Topics} element={<TopicsPage />} />
      <Route path={PageRoutes.Topic} element={<TopicDetailPage />} />
    </Routes>
  </Box>
);
