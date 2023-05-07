import React from 'react';

import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { HomeDashboard, TopicEditor } from '../../../pages/admin';
import { PageRoutes } from '../../../RoutesConstants';

export const AdminLayout = () => (
  <Box>
    <h2>Admin layout</h2>
    <Routes>
      <Route index element={<HomeDashboard />} />
      <Route path={PageRoutes.admin.AddTopic} element={<TopicEditor />} />
      <Route path={PageRoutes.admin.EditTopic} element={<TopicEditor />} />
    </Routes>
  </Box>
);
