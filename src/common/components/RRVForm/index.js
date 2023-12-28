import React from 'react';

import { Grid } from '@mui/material';

import { RRVInput } from './RRVInput';

export const RRVForm = ({ fields = [] }) => {
  const getFieldView = ({ fieldType, ...viewProps }, idx) => {
    switch (fieldType) {
      case 'text-field':
      default:
        return <RRVInput key={`input-${idx}`} {...viewProps} />;
    }
  };
  const getSizes = (rowsLength) => {
    const sizes = {
      lg: 12, md: 12, sm: 12, xs: 12,
    };
    if (rowsLength === 2) {
      return {
        ...sizes, lg: 6, md: 6, sm: 6,
      };
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
      {fields.map((rows, fieldIdx) => {
        const rowSizes = getSizes(rows.length);
        console.log('RRVForm.getSizes', rows, rowSizes);
        return (
          <Grid item key={`field-grid-${fieldIdx}`} {...rowSizes}>
            {rows.map((row, rowIdx) => (
              getFieldView(row, rowIdx)
            ))}
          </Grid>
        );
      })}
    </Grid>
  );
};
