import React from 'react';

import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import {
  // eslint-disable-next-line no-unused-vars
  Commentaries, HomeDashboard, MediaEditor, Setting, SystemUsers, TopicEditor, TopicEditor2,
} from '../../../pages/admin';
import { PageRoutes } from '../../../RoutesConstants';

export const AdminLayout = () => (
  <Box>
    <h2>Admin layout</h2>
    <Routes>
      <Route index element={<HomeDashboard />} />
      <Route path={PageRoutes.admin.AddTopic} element={<TopicEditor2 />} />
      <Route path={PageRoutes.admin.EditTopic} element={<TopicEditor2 />} />
      <Route path={PageRoutes.admin.Audio} element={<MediaEditor />} />
      <Route path={PageRoutes.admin.Commentaries} element={<Commentaries />} />
      <Route path={PageRoutes.admin.Setting} element={<Setting />} />
      <Route path={PageRoutes.admin.Users} element={<SystemUsers />} />
    </Routes>
  </Box>
);
