import React from 'react';

import {
  Grid,
} from '@mui/material';

import { Page } from '../common/components/wrappers';

import { useHomeStyles } from './styles';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
export const Home = () => {
  const styles = useHomeStyles();
  return (
    <Page title="Home">
      <div className={styles.inner}>
        <Grid container>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>Carsoul</Grid>
              <Grid item xs={12} md={6} lg={6}>Second</Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};
