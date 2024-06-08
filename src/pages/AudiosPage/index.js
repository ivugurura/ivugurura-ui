import React from 'react';

import { Grid } from '@mui/material';

import { RRVAudioPlayer } from '../../common/components/RRVAudioPlayer';
import { useWindowSize } from '../../common/hooks/useWindowSize';
import { HomeRecentTopics } from '../Home/components/Topics';

const AudiosPage = () => {
  const { width } = useWindowSize();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <RRVAudioPlayer displayText={width > 425} />
      </Grid>
      <Grid item xs={12} md={5}>
        <HomeRecentTopics xs={12} sm={12} md={12} truncate={164} />
      </Grid>
    </Grid>
  );
};

export default AudiosPage;
