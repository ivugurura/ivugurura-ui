import React from 'react';

import { Grid } from '@mui/material';

import { RRVAudioPlayer } from '../../common/components/RRVAudioPlayer';
import { HomeRecentTopics } from '../Home/components/Topics';

export const AudiosPage = () => {
  console.log('Audio player');
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <RRVAudioPlayer />
      </Grid>
      <Grid item xs={12} md={5}>
        <HomeRecentTopics xs={12} sm={12} md={12} truncate={164} />
      </Grid>
    </Grid>
  );
};
