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
const initialReplyState = { content: '', replyType: '' };
const Commentaries = () => {
  const [alertData, setAlertData] = useState(alertInitial);
  const [reply, setReply] = useState(initialReplyState);
  const [rowSelection, setRowSelection] = useState({});
  const { pagination, paginator, setPagination } = useMuiSearchPagination();
  const { data, isFetching, refetch } =
    actions.useGetCommentsTopicQuery(paginator);
  const [publish, publishRes] = actions.usePublishTopicMutation();
  const [deleteComments, delResult] = actions.useDeleteCommentsTopicMutation();
  const [replyComment, replyResult] = actions.useReplyCommentTopicMutation();
  const { data: comments, totalItems } = data || initials.dataArr;

  useEffect(() => {
    if (publishRes.isSuccess || delResult.isSuccess || replyResult.isSuccess) {
      setAlertData(alertInitial);
      publishRes.reset();
      delResult.reset();
      replyResult.reset();
      setRowSelection({});
      refetch();
    }
  }, [publishRes.isSuccess, delResult.isSuccess, replyResult.isSuccess]);

  const handleConfirm = () => {
    const { current, actionType } = alertData;
    if (actionType === 'publish') {
      publish({ commentId: current.id });
    } else if (actionType === 'delete') {
      const commentIds = current.map((c) => c.original.id);
      deleteComments({ commentIds });
    } else if (actionType === 'reply') {
      replyComment({
        ...reply,
        id: current.id,
        slug: current.topic.slug,
      });
    }
  };

  const handleSetAction = (comment, type) => {
    console.log({ comment });

    const action = comment.isPublished ? 'UNPUBLISH' : 'PUBLISH';
    let message = `Are you sure you want to ${action} the comment: 
      "${comment.content}"?`;
    if (type === 'reply') {
      message = `Message: ${comment.content.toUpperCase()}`;
    }
    const newStates = { current: comment, message, open: true };
    setAlertData((prev) => ({ ...prev, ...newStates, actionType: type }));
  };

  const handleRowSelections = (rows) => {
    setAlertData((prev) => ({
      ...prev,
      current: rows,
      actionType: 'delete',
      message: `Are you sure you want to delete those ${rows.length} comments`,
      open: true,
    }));
  };

  const replyProps = {
    reply,
    onChange: ({ target: { name, value } }) => {
      setReply((prev) => ({ ...prev, [name]: value }));
    },
  };

  return (
    <DashboardContainer title="Commentaries to the topics">
      <AlertConfirm
        {...alertData}
        setOpen={() => setAlertData((prev) => ({ ...prev, ...alertInitial }))}
        title={alertData.title}
        onConfirmYes={handleConfirm}
        loading={
          publishRes.isLoading || delResult.isLoading || replyResult.isLoading
        }
        hasInput={alertData.actionType === 'reply'}
        inputProps={replyProps}
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
            pagination={pagination}
            setPagination={setPagination}
            rowCount={totalItems || 0}
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
