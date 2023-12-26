import React from 'react';

import { TextField } from '@mui/material';

// import { FieldWrapper } from './FieldWrapper';

export const RRVInput = (props) => {
  const { type = 'text', ...inputProps } = props;
  return (
    <TextField type={type} fullWidth {...inputProps} />
  );
};
