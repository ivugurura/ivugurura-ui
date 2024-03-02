import React from 'react';

import { Grid } from '@mui/material';

import { actions, initials } from '../../../redux/apiSliceBuilder';
import TopicItem from '../../TopicItem';

export const HomeRecentTopics = () => {
  const { data, isFetching } = actions.useGetRecentTopicsQuery({
    truncate: 148,
  });

  const { data: topics } = data || initials.dataArr;
  console.log({ topics, isFetching });
  return (
    <Grid container spacing={1}>
      {topics?.length > 0 &&
        topics.map((topic) => (
          <Grid key={topic.title} item xs={12} sm={12} md={3}>
            <TopicItem topic={topic} hasMore />
          </Grid>
        ))}
    </Grid>
  );
};
