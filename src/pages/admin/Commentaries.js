import React from 'react';

import { Grid } from '@mui/material';

import { RRVTable } from '../../common/components/RRVTable/Table';

import { commentariesColumns } from './Commentary/schema';
import { DashboardContainer } from './components/DashboardContainer';

const comments = [{
  no: 1, commentor: 'A Jean', content: 'Some content', topicTitle: 'Mbese ujy ubitekereza', isPublished: 'No',
}];
export const Commentaries = () => {
  console.log('Commentaries');
  return (
    <DashboardContainer title="Commentaries to the topics">
      <Grid container spacing={1}>
        <Grid item xs={12} lg={10}>
          <RRVTable columns={commentariesColumns()} data={comments} />
        </Grid>
        <Grid item xs={12} lg={2}>
          <h1>23</h1>
          {' — Commentaries'}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
