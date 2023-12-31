import React from 'react';

import { Grid } from '@mui/material';

import { DashboardContainer } from '../components/DashboardContainer';

import { NavConfigs } from './NavConfigs';

export const Settings = () => {
  console.log('Settings');
  return (
    <DashboardContainer title="Setting menu">
      <Grid container spacing={1}>
        <Grid item xs={12} lg={9}>
          Some content
        </Grid>
        <Grid item xs={12} lg={3}>
          <NavConfigs />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
