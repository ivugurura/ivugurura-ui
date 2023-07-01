import React from 'react';

import { Grid } from '@mui/material';

import { actions } from '../../../redux/apiSliceBuilder';
import TopicItem from '../../TopicItem';

export const HomeRecentTopics = () => {
  const { data: topics, isFetching } = actions.useGetRecentTopicsQuery({ truncate: 148 });

  console.log({ topics, isFetching });
  return (
    <Grid container spacing={1}>
      {topics?.length > 0 && topics.map((topic) => (
        <Grid key={topic.title} item xs={12} sm={12} md={3}><TopicItem topic={topic} /></Grid>
      ))}
    </Grid>
  );
};
