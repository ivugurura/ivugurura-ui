import React from 'react';

import { Grid } from '@mui/material';

import { RRVTable } from '../../common/components/RRVTable/Table';

import { commentariesColumns } from './columns/commentariesColumns';
import { DashboardContainer } from './components/DashboardContainer';

const users = [{
  no: 1, names: 'A Jean', username: 'akimana', role: 'Editor', createdAt: 'September 25th 2023', isActive: 'No',
}];
export const SystemUsers = () => {
  console.log('SystemUsers');
  return (
    <DashboardContainer title="List of registered users">
      <Grid container spacing={1}>
        <Grid item xs={12} lg={10}>
          <RRVTable columns={commentariesColumns()} data={users} />
        </Grid>
        <Grid item xs={12} lg={2}>
          <h1>23</h1>
          {' — Commentaries'}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
