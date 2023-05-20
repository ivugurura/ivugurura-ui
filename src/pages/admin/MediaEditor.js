import React from 'react';

import { Grid } from '@mui/material';

import { RRVTable } from '../../common/components/RRVTable/Table';

import { audioColumns } from './columns/audioColumns';
import { DashboardContainer } from './components/DashboardContainer';

export const MediaEditor = () => {
  console.log('MediaEditor');
  return (
    <DashboardContainer title="All media">
      <Grid container spacing={1}>
        <Grid xs={12} lg={8}>
          <RRVTable columns={audioColumns()} data={[]} />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
