import React from 'react';

import { Grid } from '@mui/material';

import { RRVInput } from './RRVInput';

const RRVForm = ({ type, ...fieldViewProps }) => {
  const getFieldView = ({ id, name, ...viewProps }, index) => {
    switch (type) {
      case 'text':
      default:
        return <RRVInput id={id || name + index} {...viewProps} />;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        {' '}
        dsfsdf
      </Grid>
    </Grid>
  );
};
