import React from 'react';

import { Grid } from '@mui/material';

import { RRVTable } from '../../common/components/RRVTable/Table';

import { DashboardContainer } from './components/DashboardContainer';

export const MediaEditor = () => {
  console.log('MediaEditor');
  return (
    <DashboardContainer title="All media">
      <Grid container spacing={1}>
        <Grid
          xs={12}
          lg={7}
        >
          <RRVTable columns={[]} data={[]} />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
