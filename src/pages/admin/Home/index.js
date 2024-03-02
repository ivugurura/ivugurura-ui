/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import {
  DeleteOutlineOutlined,
  EditNoteOutlined,
  PublishOutlined,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  RRVTable,
  renderRowActionMenus,
} from '../../../common/components/RRVTable';
import { dashboardActions } from '../../../helpers/topics';
import { notifier, toLink } from '../../../helpers/utils/constants';
import { dataGenerator } from '../../../helpers/utils/dataGenerater';
import { actions } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { DashboardCount } from './DashboardCount';
import { dashboardTopicsColumns } from './schema';

const toDataCounts = (counts = {}) =>
  Object.keys(counts).map((key) => ({
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
    title: ({ isPublished }) => `${isPublished ? 'Unpublish' : 'Publish'}`,
    icon: PublishOutlined,
    action: 'publish',
  },
  {
    title: ({ entities }) =>
      `${entities?.length ? 'Remove from' : 'Set to'} home`,
    icon: DeleteOutlineOutlined,
    canDisable: ({ isPublished }) => !isPublished,
    action: 'home',
  },
];
const alertInitial = {
  current: null,
  action: '',
  message: '',
  open: false,
};
export const HomeDashboard = () => {
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(alertInitial);
  const { data, isFetching, isSuccess, ...restCountsQ } =
    actions.useGetCountsSystemQuery();
  const { data: overviewData, ...restTopicQ } =
    actions.useGetOverviewTopicQuery({ truncate: 200 });
  const [updateTopic, updateRes] = actions.useUpdateTopicMutation();
  const [setOrRemoveTopicDisplay, displayRes] =
    actions.useSetHomeTopicMutation();
  const { data: counts } = data || initials.dataArr;
  const { data: topics } = overviewData || initials.dataArr;

  useEffect(() => {
    if (updateRes.isSuccess || displayRes.isSuccess) {
      setAlertData(alertInitial);
      restTopicQ.refetch();
      if (displayRes.isSuccess) {
        displayRes.reset();
      }
      if (updateRes.isSuccess) {
        updateRes.reset();
        restCountsQ.refetch();
      }
    }
  }, [updateRes.isSuccess, displayRes.isSuccess]);

  const handleMenuAction = (type, actionParams) => {
    actionParams.closeMenu();
    if (type === 'edit') {
      navigate(toLink(`edit-topic/${actionParams.row.original.slug}`, true));
      return;
    }
    const { action, title } = dashboardActions(type, actionParams.row.original);
    setAlertData((prev) => ({
      ...prev,
      current: actionParams.row.original,
      open: true,
      action: type,
      message: `Are you sure you want to ${action.toUpperCase()} 
      "${title.toUpperCase()}"?`,
    }));
    console.log({
      isFetching,
      isSuccess,
      type,
      actionParams,
    });
  };

  const handleConfirmAction = () => {
    const { current, action } = alertData;
    if (action === 'publish') {
      updateTopic({
        slug: current.slug,
        isPublished: !current.isPublished,
      });
      return;
    }
    if (action === 'home') {
      if (!current?.isPublished) {
        notifier.error('Please publish the topic first');
        return;
      }
      setOrRemoveTopicDisplay({
        topicId: current.id,
        type: 'topic',
        displayType: 'home',
      });
    }
  };
  return (
    <DashboardContainer title="Admin dashboard">
      <AlertConfirm
        {...alertData}
        setOpen={() => setAlertData((prev) => ({ ...prev, ...alertInitial }))}
        title={alertData.title}
        onConfirmYes={handleConfirmAction}
        loading={updateRes.isLoading || displayRes.isLoading}
      />
      <Grid container spacing={1}>
        {toDataCounts(counts).map((dt) => (
          <Grid item key={dt.title} xs={12} sm={4} lg={2}>
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
          renderRowActionMenuItems={renderRowActionMenus(
            handleMenuAction,
            dashboardMenus,
          )}
        />
      </Box>
    </DashboardContainer>
  );
};
