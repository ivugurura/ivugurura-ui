import React from 'react';

import {
  Card,
  CardContent,
  // CardHeader,
  Grid,
  Typography,
} from '@mui/material';

import { RRVAudioPlayer } from '../../common/components/RRVAudioPlayer';
import { Page } from '../../common/components/wrappers';
// import { useHomeStyles } from '../styles';
// import TopicItem from '../TopicItem';

// HomeCarousel,
import {
  HomeCarousel, HomeRecentTopics, HomeYoutube, RadioHome,
} from './components';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
export const Home = () => {
  console.log('Home');
  return (
    <Page title="Home">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <HomeYoutube />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6}><RadioHome /></Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card>
                <Typography
                  component="span"
                  variant="h3"
                  color="text.primary"
                >
                  Evangelists of the Revival and Reformation
                </Typography>
                <Typography component="span" variant="h4"> — And this gospel of the kingdom shall be preached in all the world for a witness unto all nations; and then shall the end come.</Typography>
                <HomeCarousel />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Card color="red">
        {/* <CardHeader title="Recent topics" subheader="Recents" /> */}
        <CardContent>
          <HomeRecentTopics />
        </CardContent>
      </Card>
      <Card color="red">
        {/* <CardHeader title="Audio and video" subheader="Recents" /> */}
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={5}>
              <RRVAudioPlayer />
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <HomeYoutube heightRatio={0.534} widthRatio={0.57} normalHeight={420} randomize />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Page>
  );
};
