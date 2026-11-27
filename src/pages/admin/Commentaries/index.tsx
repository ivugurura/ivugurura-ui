import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVTable } from '../../../common/components/RRVTable';
import { useAlertDialog } from '../../../common/hooks/useAlertDialog';
import { useMuiSearchPagination } from '../../../common/hooks/useMuiSearchPagination';
import {
  actions,
  type MutationHook,
  type QueryHook,
} from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { commentariesColumns } from './schema';

interface IComment {
  id: string;
  content: string;
  isPublished: boolean;
  privateReply?: string;
  topic: { slug: string };
}

interface ReplyState {
  content: string;
  replyType: string;
}

type ActionType = 'publish' | 'delete' | 'reply';

interface SelectedRow {
  original: IComment;
}

interface Paginator {
  page: number;
  pageSize: number;
  search: string;
}

const initialReplyState: ReplyState = { content: '', replyType: '' };

interface ReplyDisclaimerProps {
  privateReply: string;
}

const ReplyDisclaimer: React.FC<ReplyDisclaimerProps> = ({ privateReply }) => (
  <div>
    <p>
      This comment had already been privaty replied to. The replies:
      <ul>
        {privateReply.split('~').map((comment, idx) => (
          <li key={idx}>{`${idx + 1}. ${comment}`}</li>
        ))}
      </ul>
    </p>
    <p>
      If you realy want to reply on it again, please type the reply,{' '}
      <span style={{ color: '#c617a9' }}>
        the email will also be sent to the commentor
      </span>
    </p>
  </div>
);

const Commentaries = () => {
  const { t } = useTranslation();
  const [reply, setReply] = useState<ReplyState>(initialReplyState);
  const [rowSelection, setRowSelection] = useState({});
  const { pagination, paginator, setPagination } = useMuiSearchPagination();
  const { alertValues, reset, setAlertValues } = useAlertDialog();
  const useGetComments = actions.useGetCommentsTopicQuery as unknown as QueryHook<
    IComment[],
    Paginator
  >;
  const { data, isFetching, refetch } = useGetComments(paginator);
  const usePublish = actions.usePublishTopicMutation as unknown as MutationHook<
    unknown,
    { commentId: string }
  >;
  const useDeleteComments = actions.useDeleteCommentsTopicMutation as unknown as MutationHook<
    unknown,
    { commentIds: string[] }
  >;
  const useReplyComment = actions.useReplyCommentTopicMutation as unknown as MutationHook<
    unknown,
    ReplyState & { id: string; slug: string }
  >;
  const [publish, publishRes] = usePublish();
  const [deleteComments, delResult] = useDeleteComments();
  const [replyComment, replyResult] = useReplyComment();
  const { data: comments, totalItems } = data || initials.dataArr<IComment>();

  useEffect(() => {
    if (publishRes.isSuccess || delResult.isSuccess || replyResult.isSuccess) {
      reset();
      publishRes.reset();
      delResult.reset();
      replyResult.reset();
      setRowSelection({});
      setReply(initialReplyState);
      refetch();
    }
  }, [publishRes.isSuccess, delResult.isSuccess, replyResult.isSuccess]);

  const handleConfirm = () => {
    const actionType = alertValues.actionType as ActionType;
    if (actionType === 'publish') {
      const current = alertValues.current as unknown as IComment;
      publish({ commentId: current.id });
    } else if (actionType === 'delete') {
      const current = alertValues.current as unknown as SelectedRow[];
      const commentIds = current.map((c) => c.original.id);
      deleteComments({ commentIds });
    } else if (actionType === 'reply') {
      const current = alertValues.current as unknown as IComment;
      replyComment({
        ...reply,
        id: current.id,
        slug: current.topic.slug,
      });
    }
  };

  const handleSetAction = (comment: IComment, type: ActionType) => {
    const action = comment.isPublished ? 'UNPUBLISH' : 'PUBLISH';
    let message: React.ReactNode = `Are you sure you want to ${action} the comment:
      "${comment.content}"?`;
    if (type === 'reply') {
      message = `Message: ${comment.content.toUpperCase()}`;
      if (comment.privateReply) {
        message = <ReplyDisclaimer privateReply={comment.privateReply} />;
      }
    }
    setAlertValues({ current: comment, message, open: true, actionType: type });
  };

  const handleRowSelections = (rows: SelectedRow[]) => {
    setAlertValues({
      current: rows,
      actionType: 'delete',
      message: `Are you sure you want to delete those ${rows.length} comments`,
      open: true,
    });
  };

  const replyProps = {
    reply,
    onChange: ({
      target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
      setReply((prev) => ({ ...prev, [name]: value }));
    },
  };

  return (
    <DashboardContainer title={t('admin.commentaries.title')}>
      <AlertConfirm
        {...alertValues}
        setOpen={() => reset()}
        onConfirmYes={handleConfirm}
        loading={
          publishRes.isLoading || delResult.isLoading || replyResult.isLoading
        }
        hasInput={alertValues.actionType === 'reply'}
        inputProps={replyProps}
      />
      <Grid container spacing={1}>
        <Grid size={12}>
          <RRVTable
            columns={commentariesColumns(handleSetAction, t)}
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
        <Grid size={{ xs: 12, lg: 2 }}>
          <h1>{totalItems}</h1>
          {' — Commentaries'}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Commentaries;
