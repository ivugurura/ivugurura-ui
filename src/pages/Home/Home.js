import React from 'react';

import { Card, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVAudioPlayer } from '../../common/components/RRVAudioPlayer';
import { Page } from '../../common/components/wrappers';
// import { useHomeStyles } from '../styles';
// import TopicItem from '../TopicItem';

// HomeCarousel,
import {
  HomeCarousel,
  HomeRecentTopics,
  HomeYoutube,
  RadioHome,
} from './components';
import { HomeContentLayout } from './components/HomeContentLayout';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
export const Home = () => {
  const { t } = useTranslation();
  return (
    <Page title="Home">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <HomeYoutube />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <RadioHome />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card>
                <Typography component="span" variant="h3" color="text.primary">
                  {t('reformers')}
                </Typography>
                <Typography component="span" variant="h4">
                  {' '}
                  — {t('mathew2414')}
                </Typography>
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
              heightRatio={0.534}
              widthRatio={0.57}
              normalHeight={420}
              randomize
            />
          </Grid>
        </Grid>
      </HomeContentLayout>
    </Page>
  );
};

export default Home;
