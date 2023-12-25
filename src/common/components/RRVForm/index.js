/* eslint-disable react/no-array-index-key */
import React from 'react';

import { Grid } from '@mui/material';

import { RRVInput } from './RRVInput';
import { RRVSelect } from './RRVSelect';

export const RRVForm = ({ fields = [] }) => {
  const getFieldView = ({ type, ...viewProps }) => {
    console.log({ type });
    switch (type) {
      case 'select':
        return <RRVSelect key={`select-${viewProps.name}`} type={type} {...viewProps} />;
      case 'text':
      default:
        return <RRVInput key={`input-${viewProps.name}`} type={type} {...viewProps} />;
    }
  };
  const getSizes = (rowsLength) => {
    const sizes = {
      lg: 12, md: 12, sm: 12, xs: 12,
    };
    if (rowsLength === 2) {
      return { ...sizes, lg: 6, md: 6 };
    }
    if (rowsLength === 3) {
      return { ...sizes, lg: 4, md: 4 };
    }
    if (rowsLength === 4) {
      return { ...sizes, lg: 3, md: 3 };
    }
    return sizes;
  };

  return (
    <Grid container spacing={2}>
      {fields.map((rows, fieldIdx) => (
        <Grid item {...getSizes(rows.length)} key={`field-grid-${fieldIdx}`}>
          {rows.map((row, rowIdx) => getFieldView(row, rowIdx))}
        </Grid>
      ))}
    </Grid>
  );
};
