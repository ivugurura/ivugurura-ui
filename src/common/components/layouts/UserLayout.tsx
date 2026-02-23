import React, { Suspense } from 'react';

import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PageRoutes } from '../../../RoutesConstants';

import { SuspenseFallback } from './SuspenseFallback';

interface UserRoute {
  path?: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

const userRoutes: UserRoute[] = [
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
    path: PageRoutes.Library,
    component: React.lazy(() => import('../../../pages/LibraryPage')),
  },
  {
    path: PageRoutes.Ask,
    component: React.lazy(() => import('../../../pages/AskPage')),
  },
  {
    path: PageRoutes.ViewBook,
    component: React.lazy(() => import('../../../pages/BookViewPage')),
  },
  {
    path: PageRoutes.Audios,
    component: React.lazy(() => import('../../../pages/AudiosPage')),
  },
  {
    path: PageRoutes.Announcement,
    component: React.lazy(() => import('../../../pages/AnnouncementPage')),
  },
];

export const UserLayout: React.FC = () => (
  <Box sx={{ minHeight: '70vh' }}>
    <Routes>
      {userRoutes.map(({ path, component: Component }) => (
        <Route
          key={path || 'index'}
          index={path === undefined}
          path={path}
          element={
            <Suspense fallback={<SuspenseFallback />}>
              <Component />
            </Suspense>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </Box>
);
