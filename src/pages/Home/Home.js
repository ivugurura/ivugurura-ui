import React from 'react';

import { MusicNote, PlayArrow } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
// import YouTube from 'react-youtube';

import { Page } from '../../common/components/wrappers';
// import { useHomeStyles } from '../styles';
import TopicItem from '../TopicItem';

// HomeCarousel,
import { HomeCarousel, RadioHome } from './components';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
export const Home = () => {
  // const styles = useHomeStyles();
  console.log('Home');
  return (
    <Page title="Home">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} />
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
        <CardHeader title="Recent topics" subheader="Recents" />
        <CardContent>
          <Grid container spacing={1}>
            {[1, 2, 3, 4].map((item) => (
              <Grid key={item} item xs={12} sm={12} md={3}><TopicItem /></Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Card color="red">
        <CardHeader title="Audio and video" subheader="Recents" />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={5}>
              <Card>
                <AudioPlayer
                  autoPlay
                  src="http://example.com/audio.mp3"
                  onPlay={() => console.log('onPlay')}
                />
                <CardHeader
                  title="to Scott, Alex, Jennifer"
                  subheader={(
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        by Ivugurura n ubugorozi
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </>
                  )}
                />
                <CardContent>
                  <List>
                    {[1, 2, 3].map((item) => (
                      <>
                        <ListItem
                          key={item}
                          secondaryAction={(
                            <IconButton edge="end">
                              <PlayArrow />
                            </IconButton>
                          )}
                          alignItems="flex-start"
                        >
                          <ListItemIcon>
                            <MusicNote />
                          </ListItemIcon>
                          <ListItemText primary="Song 1" secondary="Some description" />
                        </ListItem>
                        <Divider variant="insert" component="li" />
                      </>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={7} />
          </Grid>
        </CardContent>
      </Card>
    </Page>
  );
};
