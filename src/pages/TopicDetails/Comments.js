import React, { useEffect } from 'react';

import {
  Box, Button, Grid, Typography,
} from '@mui/material';

import { RRVForm } from '../../common/components/RRVForm';
import { actions, initials } from '../../redux/apiSliceBuilder';

import { commentSchema, commentState } from './schema';

export const Comments = ({ slug }) => {
  const [comment, setComment] = React.useState(commentState);
  const [save, saveRes] = actions.useAddCommentTopicMutation();

  const { data, isFetching } = actions.useViewCommentsTopicQuery({ slug });

  useEffect(() => {
    if (saveRes.isSuccess) {
      setComment(commentState);
      saveRes.reset();
    }
  }, [saveRes.isSuccess]);
  const { data: comments, totalItems } = data || initials.dataArr;
  console.log('Comments', { isFetching, comments, totalItems });
  return (
    <Grid item xs={12}>
      <hr />
      <Box>Leave us a comment to this comment</Box>
      <Typography>We will not share your email</Typography>
      <RRVForm fields={commentSchema()} states={comment} setStates={setComment} />
      <Button
        onClick={() => save({ ...comment, slug })}
        disabled={saveRes.isLoading}
      >
        {saveRes.isLoading ? 'Saving,...' : 'Send'}
      </Button>
    </Grid>
  );
};
