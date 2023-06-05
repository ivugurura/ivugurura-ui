import React from 'react';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
  Avatar, Grid, CardHeader, IconButton, Card,
} from '@mui/material';
import { red } from '@mui/material/colors';

import { TopicsHeader } from '../components';
import TopicItem from '../TopicItem';

export const TopicDetailPage = (props) => {
  console.log('TopicsPage', props);
  return (
    <Grid container spacing={2}>
      <Grid item md={9}>
        <Grid container>
          <Grid item md={12}>
            <TopicsHeader />
          </Grid>
          <Grid item md={12}>
            <Card>
              <TopicItem />
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        <Grid container spacing={1}>
          {[1, 2, 3, 4].map((el) => (
            <Grid item>
              <Card key={el}>
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
                  title="Shrimp and Chorizo Paella and tcella"
                  subheader="September 14, 2016"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
