import React, { useEffect } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { RRVForm } from '../../common/components/RRVForm';
import { notifier } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';

import { commentSchema, commentState } from './schema';
import { styles } from './TopicDetails.style';

export const Comments = ({ slug }) => {
  const { t } = useTranslation();
  const [comment, setComment] = React.useState(commentState);
  const [save, saveRes] = actions.useAddCommentTopicMutation();

  const { data, isFetching } = actions.useViewCommentsTopicQuery({ slug });

  useEffect(() => {
    if (saveRes.isSuccess) {
      notifier.success(t('commentSuccess'));
      setComment(commentState);
      saveRes.reset();
    }
  }, [saveRes.isSuccess]);

  const { data: comments, totalItems } = data || initials.dataArr;
  console.log('Comments', {
    isFetching,
    totalItems,
  });
  const hasComments = comments?.length > 0;
  return (
    <Grid item xs={12}>
      <Box sx={styles.root}>
        {hasComments && (
          <Typography variant="h2" sx={styles.title}>
            {t('comments')}
          </Typography>
        )}
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
      {hasComments && <hr />}
      <Typography variant="h4" align="center">
        {t('leaveComment')}
      </Typography>
      <Typography>{t('notEmailPublish')}</Typography>
      <RRVForm
        fields={commentSchema(t)}
        states={comment}
        setStates={setComment}
      />
      <Button
        onClick={() => save({ ...comment, slug })}
        disabled={saveRes.isLoading}
      >
        {t(saveRes.isLoading ? 'actions.loading' : 'actions.btnSend')}
      </Button>
    </Grid>
  );
};
