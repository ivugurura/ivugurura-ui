import React from 'react';

import { Grid } from '@mui/material';

import { RRVTable } from '../../../common/components/RRVTable';
import { actions } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { commentariesColumns } from '../columns/commentariesColumns';
import { DashboardContainer } from '../components/DashboardContainer';

export const Commentaries = () => {
  const { data, refetch } = actions.useGetCommentsTopicQuery();
  const { data: comments } = data || initials.dataArr;
  return (
    <DashboardContainer title="Commentaries to the topics">
      <Grid container spacing={1}>
        <Grid item xs={12} lg={10}>
          <RRVTable
            columns={commentariesColumns()}
            data={comments}
          />
        </Grid>
        <Grid item xs={12} lg={2}>
          <h1>23</h1>
          {' — Commentaries'}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
