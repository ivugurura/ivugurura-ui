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
  actionType: '',
  message: '',
  open: false,
};
const Commentaries = () => {
  const [alertData, setAlertData] = useState(alertInitial);
  const [rowSelection, setRowSelection] = useState({});
  const { data, isFetching, refetch } = actions.useGetCommentsTopicQuery();
  const [publish, publishRes] = actions.usePublishTopicMutation();
  const [deleteComments, delResult] = actions.useDeleteCommentsTopicMutation();
  const { data: comments, totalItems } = data || initials.dataArr;

  useEffect(() => {
    if (publishRes.isSuccess || delResult.isSuccess) {
      setAlertData(alertInitial);
      publishRes.reset();
      delResult.reset();
      refetch();
    }
  }, [publishRes.isSuccess, delResult.isSuccess]);

  const handleConfirm = () => {
    if (alertData.current.id) {
      publish({ commentId: alertData.current.id });
    } else {
      const commentIds = alertData.current.map((c) => c.original.id);
      deleteComments({ commentIds });
    }
  };

  const handleSetAction = (comment, type) => {
    console.log({ type });
    const action = comment.isPublished ? 'UNPUBLISH' : 'PUBLISH';
    let message = `Are you sure you want to ${action} the comment: 
      "${comment.content}"?`;
    if (type === 'reply') {
      message = 'Please type the reply below';
    }
    const newStates = { current: comment, message, open: true };
    setAlertData((prev) => ({ ...prev, ...newStates, actionType: type }));
  };

  const handleRowSelections = (rows) => {
    setAlertData((prev) => ({
      ...prev,
      current: rows,
      message: `Are you sure you want to delete those ${rows.length} comments`,
      open: true,
    }));
  };
  console.log({ rowSelection });

  return (
    <DashboardContainer title="Commentaries to the topics">
      <AlertConfirm
        {...alertData}
        setOpen={() => setAlertData((prev) => ({ ...prev, ...alertInitial }))}
        title={alertData.title}
        onConfirmYes={handleConfirm}
        loading={publishRes.isLoading}
        hasInput={alertData.actionType === 'reply'}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} lg={10}>
          <RRVTable
            columns={commentariesColumns(handleSetAction)}
            data={comments}
            isLoading={isFetching}
            enableRowSelection
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            onHandleSelected={handleRowSelections}
            btnSelectionLabel="Delete selected"
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
