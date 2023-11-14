/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import {
  Box,
  Card, CardContent, CardHeader, Container, Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import { RRVTable } from '../../common/components/RRVTable';
import { dataGenerator } from '../../helpers/utils/dataGenerater';
import { actions } from '../../redux/actions';
import { initials } from '../../redux/apiSliceBuilder';

import { DashboardContainer } from './components/DashboardContainer';
import { DashboardCount } from './components/DashboardCount';
import { dashboardTopicsColumns, renderRowActionMenuItems } from './dashboardTopicsColumns';

const toDataCounts = (counts = {}) => Object.keys(counts).map((key) => ({
  title: key,
  counts: counts[key],
  difference: 0,
}));
export const HomeDashboard = () => {
  const { data, isFetching, isSuccess } = actions.useGetDashboardCountsQuery();
  const { data: overviewData } = actions.useGetOverviewTopicQuery({ truncate: 200 });
  const { data: counts } = data || initials.dataArr;
  const { data: topics } = overviewData || initials.dataArr;

  const handleActionMenuClick = (action) => (actionProps) => {
    actionProps.closeMenu();
    renderRowActionMenuItems(actionProps);
  };

  console.log({ isFetching, isSuccess });
  return (
    <DashboardContainer title="Admin dashboard">
      <Grid
        container
        spacing={1}
      >
        {toDataCounts(counts).map((dt) => (
          <Grid
            item
            key={dt.title}
            xs={12}
            sm={4}
            lg={2}
          >
            <DashboardCount
              title={dt.title}
              value={dt.counts}
              difference={dt.difference}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: '1rem' }}>
        <RRVTable
          columns={dashboardTopicsColumns()}
          data={topics}
          enableRowActions
          renderRowActionMenuItems={handleActionMenuClick}
        />
      </Box>
    </DashboardContainer>
  );
};
