import { useRef } from 'react';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
  const { t } = useTranslation();
  const radioRef = useRef(null);
  const youtubeRef = useRef(null);
  const youtubeData = actions.useListYoutubesQuery();

  const scrollToSection = (section) => {
    let ref = radioRef;
    if (section === 'youtube') {
      ref = youtubeRef;
    }
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <PageHelmet>
      <Box>
        <HomeWelcomePage onScrollTo={scrollToSection} />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <HomeLatestBlog />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} ref={radioRef}>
            <RadioHome />
          </Grid>
          <Grid item xs={12} sm={12} md={12} ref={youtubeRef}>
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
          <Box
            pb={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Card className="card">
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                >
                  <Typography variant="h2">{t('appDownload')}</Typography>
                  <Box
                    component={Link}
                    target="_blank"
                    to="https://play.google.com/store/apps/details?id=reformationvoice.org.reformationvoicemobileapp&hl=en&pli=1"
                  >
                    {/* <img
                      src="/img/apple-img.svg"
                      alt="Download on app store"
                      id="padding"
                    /> */}
                    <img
                      src="/img/android-img.svg"
                      alt="Download on play store"
                    />
                  </Box>
                </Box>

                <Typography
                  variant="subtitle2"
                  id="typography"
                  fontWeight={400}
                >
                  {t('appDownloadText')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
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
