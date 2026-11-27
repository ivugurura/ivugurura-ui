import React, { useEffect } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { RRVForm } from '../../common/components/RRVForm';
import type { FormStateType } from '../../common/components/RRVForm/types';
import { notifier } from '../../helpers/utils/constants';
import {
  actions,
  initials,
  type MutationHook,
  type QueryHook,
} from '../../redux/actions';

import { commentSchema, commentState } from './schema';
import { styles } from './TopicDetails.style';

interface CommentsProps {
  slug: string;
}

export const Comments = ({ slug }: CommentsProps) => {
  const { t } = useTranslation();
  const [comment, setComment] = React.useState<FormStateType>(commentState);
  const useAddComment = actions.useAddCommentTopicMutation as MutationHook<
    unknown,
    FormStateType & { slug: string }
  >;
  const useViewComments = actions.useViewCommentsTopicQuery as QueryHook<
    APP.IComment[],
    { slug: string }
  >;
  const [save, saveRes] = useAddComment();

  const { data } = useViewComments({ slug });

  useEffect(() => {
    if (saveRes.isSuccess) {
      notifier.success(t('commentSuccess'));
      setComment(commentState);
      saveRes.reset();
    }
  }, [saveRes, t]);

  const { data: comments } = data || initials.dataArr<APP.IComment>();

  const hasComments = comments?.length > 0;
  return (
    <Grid size={12}>
      {hasComments && (
        <Box sx={styles.root}>
          <Typography variant="h2" sx={styles.title}>
            {t('comments')}
          </Typography>

          {comments.map((c) => (
            <Box key={c.id} sx={styles.comment}>
              <Box sx={styles.commentBody}>
                <Typography variant="body1" sx={styles.commentAuthor}>
                  {c.names}
                </Typography>
                <Typography variant="body1" sx={styles.commentText}>
                  {c.content}
                </Typography>
                <Typography variant="caption" sx={styles.commentTimestamp}>
                  {moment(c.createdAt).fromNow()}
                </Typography>
              </Box>
              {c.replies.map((r) => (
                <Box key={r.id} sx={styles.reply}>
                  <Typography variant="body1" sx={styles.replyAuthor}>
                    {t('logo')}
                  </Typography>
                  <Typography variant="body1" sx={styles.replyText}>
                    {r.content}
                  </Typography>
                  <Typography variant="caption" sx={styles.replyTimestamp}>
                    {moment(r.createdAt).fromNow()}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}

      <Box style={styles.commentSpace}>
        <Typography variant="h4" align="center">
          {t('leaveComment')}
        </Typography>
        <Typography>{t('notEmailPublish')}</Typography>
        <RRVForm
          fields={commentSchema(t)}
          states={comment}
          setStates={setComment}
        />
        <Box sx={styles.btnContainer}>
          <Button
            variant="contained"
            sx={styles.submitBtn}
            onClick={() => save({ ...comment, slug })}
            disabled={saveRes.isLoading}
          >
            {t(
              saveRes.isLoading ? 'actions.loading' : 'actions.btnSend',
            ).toUpperCase()}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};
