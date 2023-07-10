import React from 'react';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
  Avatar, Grid, CardHeader, IconButton, Card,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useParams } from 'react-router';

import { actions } from '../../redux/apiSliceBuilder';
import { TopicsHeader } from '../components';
import TopicItem from '../TopicItem';

export const TopicDetailPage = () => {
  const { slug } = useParams();
  const { data: topic, isFetching } = actions.useViewTopicQuery({ slug });
  console.log('TopicDetailPage', { topic, isFetching });

  return (
    <Grid container spacing={2}>
      <Grid item md={9}>
        <Grid container>
          <Grid item md={12}>
            <TopicsHeader />
          </Grid>
          <Grid item md={12}>
            <Card>
              {topic && <TopicItem topic={topic} />}
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        {topic && (
        <Grid container spacing={1}>
          {topic?.category?.relatedTopics.map((rt) => (
            <Grid item>
              <Card key={rt.slug}>
                <CardHeader
                  avatar={(
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  )}
                  action={(
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  )}
                  title={rt.title}
                  subheader="September 14, 2016"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        )}
      </Grid>
    </Grid>
  );
};
