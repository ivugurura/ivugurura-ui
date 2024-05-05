import React, { Suspense } from 'react';

import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { PageRoutes } from '../../../RoutesConstants';

const userRoutes = [
  {
    path: undefined,
    component: React.lazy(() => import('../../../pages/Home')),
  },
  {
    path: PageRoutes.Topics,
    component: React.lazy(() => import('../../../pages/TopicsPage')),
  },
  {
    path: PageRoutes.Topic,
    component: React.lazy(() => import('../../../pages/TopicDetails')),
  },
  {
    path: PageRoutes.Audios,
    component: React.lazy(() => import('../../../pages/AudiosPage')),
  },
];

export const UserLayout = () => (
  <Box px={2} py={1}>
    {/* <h2>Users layout</h2> */}
    <Routes>
      {userRoutes.map(({ path, component: Component }) => (
        <Route
          index={path === undefined}
          path={path}
          element={
            <Suspense>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Routes>
  </Box>
);
