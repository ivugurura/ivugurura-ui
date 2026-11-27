import { useRef } from 'react';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PageHelmet } from '../../common/components/wrappers';

import {
  HomeLatestBlog,
  HomeRecentTopics,
  HomeWelcome,
  HomeYoutube,
  HomeListenSection,
} from './components';
import { HomeContentLayout } from './components/HomeContentLayout';

type HomeSection = 'radio' | 'youtube';

export const Home = () => {
  const { t } = useTranslation();
  const radioRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: HomeSection) => {
    const ref = section === 'youtube' ? youtubeRef : radioRef;
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <PageHelmet>
      <Box>
        <HomeWelcome onScrollTo={scrollToSection} />
        <Grid container spacing={0}>
          <Grid size={12}>
            <HomeLatestBlog />
          </Grid>
          <Grid size={12} ref={radioRef}>
            <HomeListenSection />
          </Grid>
          <Grid size={12} ref={youtubeRef}>
            <HomeYoutube />
          </Grid>
        </Grid>
        <HomeRecentTopics />

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
        </HomeContentLayout>
      </Box>
    </PageHelmet>
  );
};

export default Home;
