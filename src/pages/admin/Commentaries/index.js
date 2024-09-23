import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import { RRVTable } from '../../../common/components/RRVTable';
import { actions } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { commentariesColumns } from './schema';

const alertInitial = {
  current: null,
  message: '',
  open: false,
};
const Commentaries = () => {
  const [alertData, setAlertData] = useState(alertInitial);
  const { data, isFetching, refetch } = actions.useGetCommentsTopicQuery();
  const [publish, publishRes] = actions.usePublishTopicMutation();
  const { data: comments, totalItems } = data || initials.dataArr;

  useEffect(() => {
    if (publishRes.isSuccess) {
      setAlertData(alertInitial);
      publishRes.reset();
      refetch();
    }
  }, [publishRes.isSuccess]);

  const handleSetAction = (comment) => {
    const action = comment.isPublished ? 'UNPUBLISH' : 'PUBLISH';
    setAlertData((prev) => ({
      ...prev,
      current: comment,
      message: `Are you sure you want to ${action} the comment: 
      "${comment.content}"?`,
      open: true,
    }));
  };
  return (
    <DashboardContainer title="Commentaries to the topics">
      <AlertConfirm
        {...alertData}
        setOpen={() => setAlertData((prev) => ({ ...prev, ...alertInitial }))}
        title={alertData.title}
        onConfirmYes={() => publish({ commentId: alertData.current.id })}
        loading={publishRes.isLoading}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} lg={10}>
          <RRVTable
            columns={commentariesColumns(handleSetAction)}
            data={comments}
            isLoading={isFetching}
          />
        </Grid>
        <Grid item xs={12} lg={2}>
          <h1>{totalItems}</h1>
          {' — Commentaries'}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Commentaries;
