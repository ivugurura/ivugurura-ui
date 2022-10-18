import React from 'react';

import {
  Grid,
} from '@mui/material';

import Page from '../common/components/Page';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
export const Home = () => (
  <Page title="Home">
    <Grid container>
      <Grid item>
        <Grid container>
          <Grid item>Carsoul</Grid>
          <Grid item>Second</Grid>
        </Grid>
      </Grid>
    </Grid>
  </Page>
);
