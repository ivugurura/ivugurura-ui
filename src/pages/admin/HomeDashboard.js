/* eslint-disable no-unused-vars */
import React from 'react';

import {
  Box,
  Card, CardContent, CardHeader, Container, Grid,
} from '@mui/material';

import { RRVTable } from '../../common/components/RRVTable';
import { dataGenerator } from '../../helpers/utils/dataGenerater';

import { DashboardContainer } from './components/DashboardContainer';
import { DashboardCount } from './components/DashboardCount';
import { dashboardTopicsColumns } from './dashboardTopicsColumns';

const data = dataGenerator({
  title: '{{lorem.sentences}}',
  description: '{{lorem.sentences}}',
  views: '{{random.numeric}}',
  createdAt: '{{date.between}}',
}, 7);
export const HomeDashboard = () => {
  // const columns = useMemo(dashboardTopicsColumns, []);
  const dataCounts = [
    { title: 'Published', counts: 160, difference: 2 },
    { title: 'Unpublished', counts: 1, difference: 1 },
    { title: 'Audio', counts: 12, difference: 2 },
    { title: 'Video', counts: 0, difference: 0 },
    { title: 'Commentaries', counts: 99, difference: 23 },
    { title: 'System users', counts: 4, difference: 0 },
  ];
  console.log({ data });
  return (
    <DashboardContainer title="Admin dashboard">
      <Grid
        container
        spacing={1}
      >
        {dataCounts.map((dt) => (
          <Grid
            item
            xs={12}
            sm={4}
            lg={2}
          >
            <DashboardCount
              key={dt.title}
              title={dt.title}
              value={dt.counts}
              difference={dt.difference}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: '1rem' }}>
        <RRVTable columns={dashboardTopicsColumns()} data={data} />
      </Box>
    </DashboardContainer>
  );
};
