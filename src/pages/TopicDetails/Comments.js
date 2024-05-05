import React, { useEffect } from 'react';

import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVForm } from '../../common/components/RRVForm';
import { toFCap } from '../../helpers/utils';
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
      {hasComments && (
        <Typography variant="h4" align="center">
          {t('comments')}
        </Typography>
      )}
      {comments.map((c) => (
        <Box key={c.id} sx={styles.commentRoot}>
          <Avatar>{toFCap(c.names)}</Avatar>
          <Box pl={2}>
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                fontSize="0.875rem"
              >
                {c.names}
              </Typography>
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight={500}
              fontSize="0.875rem"
            >
              {c.content}
            </Typography>
          </Box>
        </Box>
      ))}
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
