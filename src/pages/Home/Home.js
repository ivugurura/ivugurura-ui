import React from 'react';

import { Box, Grid } from '@mui/material';
// import { useTranslation } from 'react-i18next';

// import { RRVAudioPlayer } from '../../common/components/RRVAudioPlayer';
import { PageHelmet } from '../../common/components/wrappers';
import { actions } from '../../redux/apiSliceBuilder';

import {
  // HomeCarousel,
  HomeLatestBlog,
  HomeRecentTopics,
  HomeWelcomePage,
  HomeYoutube,
  RadioHome,
} from './components';
import { HomeContentLayout } from './components/HomeContentLayout';

export const Home = () => {
  // const { t } = useTranslation();
  const youtubeData = actions.useListYoutubesQuery();
  return (
    <PageHelmet>
      <Box>
        <HomeWelcomePage />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <HomeLatestBlog />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <RadioHome />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <HomeYoutube youtubeData={youtubeData} />

            {/* <Grid item md={6}>
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
              </Grid> */}
          </Grid>
        </Grid>
        <HomeContentLayout cardContentProps={{ sx: { paddingBottom: 0 } }}>
          <HomeRecentTopics truncate={140} />
        </HomeContentLayout>
        <HomeContentLayout>
          {/* <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={5}>
              <RRVAudioPlayer displayText={false} hasMore />
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <HomeYoutube
                youtubeData={youtubeData}
                heightRatio={0.86}
                widthRatio={0.57}
                normalHeight={440}
                randomize
              />
            </Grid>
          </Grid> */}
        </HomeContentLayout>
      </Box>
    </PageHelmet>
  );
};

export default Home;
