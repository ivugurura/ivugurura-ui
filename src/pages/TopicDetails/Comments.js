import React from 'react';

import {
  Box, Button, Grid, Typography,
} from '@mui/material';

import { RRVForm } from '../../common/components/RRVForm';
import { actions, initials } from '../../redux/apiSliceBuilder';

import { commentSchema } from './schema';

export const Comments = () => {
  const { data, isFetching } = actions.useGetCommentsTopicQuery();
  const { data: comments, totalItems } = data || initials.dataArr;
  console.log('Comments', { isFetching, comments, totalItems });
  return (
    <Grid item xs={12}>
      <hr />
      <Box>Leave us a comment to this comment</Box>
      <Typography>We will not share your email</Typography>
      <RRVForm fields={commentSchema()} />
      <Button>Send</Button>
    </Grid>
  );
};
