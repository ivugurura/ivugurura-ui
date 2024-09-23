import React, { Suspense, useMemo } from 'react';

import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { actions, initials } from '../../../redux/apiSliceBuilder';
import { PageRoutes } from '../../../RoutesConstants';

import { SuspenseFallback } from './SuspenseFallback';

const DashboardPage = React.lazy(() => import('../../../pages/admin/Home'));
const dashboardRoutes = [
  {
    path: PageRoutes.admin.Commentaries,
    component: React.lazy(() => import('../../../pages/admin/Commentaries')),
  },
  {
    path: PageRoutes.admin.Audio,
    component: React.lazy(() => import('../../../pages/admin/MediaEditor')),
  },
  {
    path: PageRoutes.admin.Setting,
    component: React.lazy(() => import('../../../pages/admin/Settings')),
  },
  {
    path: PageRoutes.admin.Users,
    component: React.lazy(() => import('../../../pages/admin/Users')),
  },
  {
    path: PageRoutes.admin.AddTopic,
    component: React.lazy(() => import('../../../pages/admin/TopicEditor2')),
  },
  {
    path: PageRoutes.admin.EditTopic,
    component: React.lazy(() => import('../../../pages/admin/TopicEditor2')),
  },
];
export const AdminLayout = () => {
  const { data, ...restCountsQ } = actions.useGetCountsSystemQuery();
  const { data: counts } = data || initials.dataObj;
  const toDataCounts = useMemo(
    () =>
      Object.keys(counts ?? {}).map((key) => ({
        title: key,
        counts: counts[key],
        difference: 0,
      })),
    [counts],
  );
  return (
    <Box>
      <h2>
        {toDataCounts
          .map(({ title, counts: cnts }) => `${title.toUpperCase()}: ${cnts}`)
          .join(', ')}
      </h2>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<SuspenseFallback />}>
              <DashboardPage
                countFetch={{ data: toDataCounts, ...restCountsQ }}
              />
            </Suspense>
          }
        />
        {dashboardRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
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
};
