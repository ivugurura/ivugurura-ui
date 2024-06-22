import React, { useMemo } from 'react';

import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import {
  Commentaries,
  HomeDashboard,
  MediaEditor,
  Settings,
  SystemUsers,
  // TopicEditor,
  TopicEditor2,
} from '../../../pages/admin';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import { PageRoutes } from '../../../RoutesConstants';

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
            <HomeDashboard
              countFetch={{ data: toDataCounts, ...restCountsQ }}
            />
          }
        />
        <Route path={PageRoutes.admin.AddTopic} element={<TopicEditor2 />} />
        <Route path={PageRoutes.admin.EditTopic} element={<TopicEditor2 />} />
        <Route path={PageRoutes.admin.Audio} element={<MediaEditor />} />
        <Route
          path={PageRoutes.admin.Commentaries}
          element={<Commentaries />}
        />
        <Route path={PageRoutes.admin.Setting} element={<Settings />} />
        <Route path={PageRoutes.admin.Users} element={<SystemUsers />} />
      </Routes>
    </Box>
  );
};
