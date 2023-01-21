import React from 'react';

import { Grid } from '@mui/material';

import { TopicsHeader } from './components';

export const TopicsPage = () => {
  console.log('TopicsPage');
  return (
    <Grid container>
      <Grid item md={9}>
        <Grid container>
          <Grid item md={12}>
            <TopicsHeader />
          </Grid>
          <Grid item md={12}>Topic area(details or list)</Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>Most reads topics</Grid>
    </Grid>
  );
};
