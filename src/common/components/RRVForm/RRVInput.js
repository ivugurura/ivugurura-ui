import React from 'react';

import { TextField, MenuItem } from '@mui/material';

export const RRVInput = (props) => {
  const {
    type = 'text',
    select = false,
    options = [],
    value = '',
    size = 'small',
    labelSelector = 'label',
    valueSelector = 'value',
    ...inputProps
  } = props;
  return (
    <TextField
      type={type}
      fullWidth
      select={select}
      size={size}
      value={value || ''}
      {...inputProps}
    >
      {select && (
        options.map((option) => (
          <MenuItem key={option[valueSelector]} value={option[valueSelector]}>
            {option[labelSelector]}
          </MenuItem>
        ))
      )}
    </TextField>
  );
};
