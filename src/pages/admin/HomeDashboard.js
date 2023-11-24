/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { DeleteOutlineOutlined, EditNoteOutlined, PublishOutlined } from '@mui/icons-material';
import {
  Box,
  Card, CardContent, CardHeader, Container, Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RRVTable } from '../../common/components/RRVTable';
import { dataGenerator } from '../../helpers/utils/dataGenerater';
import { actions } from '../../redux/actions';
import { initials } from '../../redux/apiSliceBuilder';

import { AlertConfirm } from './components/AlertConfirm';
import { DashboardContainer } from './components/DashboardContainer';
import { DashboardCount } from './components/DashboardCount';
import { dashboardTopicsColumns, renderRowActionMenuItems } from './dashboardTopicsColumns';

const toDataCounts = (counts = {}) => Object.keys(counts).map((key) => ({
  title: key,
  counts: counts[key],
  difference: 0,
}));
const dashboardMenus = [
  {
    title: 'Edit',
    icon: EditNoteOutlined,
    action: 'edit',
  },
  {
    title: 'Unpublish',
    icon: PublishOutlined,
    action: 'publish',
  },
  {
    title: 'Remove from home',
    icon: DeleteOutlineOutlined,
    action: 'home',
  },
];
const alertInitial = {
  action: '', title: '', message: '', open: false,
};
export const HomeDashboard = () => {
  const history = useHistory();
  const [alertData, setAlertData] = useState(alertInitial);
  const { data, isFetching, isSuccess } = actions.useGetDashboardCountsQuery();
  const { data: overviewData } = actions.useGetOverviewTopicQuery({ truncate: 200 });
  const { data: counts } = data || initials.dataArr;
  const { data: topics } = overviewData || initials.dataArr;

  const handleMenuAction = (type, actionParams) => {
    actionParams.closeMenu();
    if (type === 'edit') {
      history.push(`/admin/topics/${actionParams.row.original.id}`);
      return;
    }
    setAlertData((prev) => ({
      ...prev,
      open: true,
      action: type,
      message: `Are you sure you want to ${type.toUpperCase()} 
      ${actionParams.row.original.title.toUpperCase()}?`,
    }));
    console.log({
      isFetching, isSuccess, type, actionParams,
    });
  };
  return (
    <DashboardContainer title="Admin dashboard">
      <AlertConfirm
        setOpen={() => setAlertData((prev) => ({ ...prev, ...alertInitial }))}
        {...alertData}
      />
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
          renderRowActionMenuItems={renderRowActionMenuItems(handleMenuAction, dashboardMenus)}
        />
      </Box>
    </DashboardContainer>
  );
};
