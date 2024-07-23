import React from 'react';

import { Box, Card, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVAudioPlayer } from '../../common/components/RRVAudioPlayer';
import { Page } from '../../common/components/wrappers';

import {
  HomeCarousel,
  HomeRecentTopics,
  HomeYoutube,
  RadioHome,
} from './components';
import { HomeContentLayout } from './components/HomeContentLayout';

export const Home = () => {
  const { t } = useTranslation();
  return (
    <Page title="Home">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <HomeYoutube />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <RadioHome />
            </Grid>
            <Grid item md={6}>
              <Card>
                <Box
                  sx={{
                    maxHeight: { xs: '100%', sm: 110 },
                    overflow: 'scroll',
                  }}
                >
                  <Typography
                    component="span"
                    variant="h3"
                    color="text.primary"
                  >
                    {t('reformers')}
                  </Typography>
                  <Typography component="span" variant="h4">
                    {' '}
                    — {t('mathew2414')}
                  </Typography>
                </Box>
                <HomeCarousel />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <HomeContentLayout cardContentProps={{ sx: { paddingBottom: 0 } }}>
        <HomeRecentTopics truncate={140} />
      </HomeContentLayout>
      <HomeContentLayout>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={5}>
            <RRVAudioPlayer displayText={false} />
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <HomeYoutube
              heightRatio={0.86}
              widthRatio={0.57}
              normalHeight={440}
              randomize
            />
          </Grid>
        </Grid>
      </HomeContentLayout>
    </Page>
  );
};

export default Home;
