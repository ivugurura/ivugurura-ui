import React from 'react';

import { Grid } from '@mui/material';

import { actions, initials } from '../../../redux/apiSliceBuilder';
import TopicItem from '../../TopicItem';

export const HomeRecentTopics = ({
  xs = 12,
  sm = 12,
  md = 3,
  truncate = 148,
}) => {
  const { data } = actions.useGetRecentTopicsQuery({
    truncate,
  });

  const { data: topics } = data || initials.dataArr;
  return (
    <Grid container spacing={1}>
      {topics?.length > 0 &&
        topics.map((topic) => (
          <Grid key={topic.title} item xs={xs} sm={sm} md={md}>
            <TopicItem topic={topic} hasMore />
          </Grid>
        ))}
    </Grid>
  );
};
