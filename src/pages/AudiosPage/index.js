import React from 'react';

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVAudioPlayer } from '../../common/components/RRVAudioPlayer';
import { PageHelmet } from '../../common/components/wrappers';
import { useWindowSize } from '../../common/hooks/useWindowSize';
// import { HomeRecentTopics } from '../Home/components/Topics';

const AudiosPage = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  return (
    <PageHelmet title={t('audios')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <RRVAudioPlayer displayText={width > 425} nOfAudios={20} />
        </Grid>
        {/* <Grid item xs={12} md={5}>
        <HomeRecentTopics xs={12} sm={12} md={12} truncate={164} />
      </Grid> */}
      </Grid>
    </PageHelmet>
  );
};

export default AudiosPage;
