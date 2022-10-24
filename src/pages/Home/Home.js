import React from 'react';

import { Card } from '@material-ui/core';
import {
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';

import { Page } from '../../common/components/wrappers';
// import { useHomeStyles } from '../styles';
import TopicItem from '../TopicItem';

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
            <Grid item xs={12} sm={12} md={12} lg={12}><TopicItem /></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6}><TopicItem /></Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}><TopicItem /></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Card color="red">
        <CardHeader title="Recent topics" subheader="Recents" />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={3}><TopicItem /></Grid>
            <Grid item xs={12} sm={12} md={3}><TopicItem /></Grid>
            <Grid item xs={12} sm={12} md={3}><TopicItem /></Grid>
            <Grid item xs={12} sm={12} md={3}><TopicItem /></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Page>
  );
};
