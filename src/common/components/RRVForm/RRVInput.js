import React from 'react';

import { TextField, MenuItem } from '@mui/material';

export const RRVInput = (props) => {
  const {
    id,
    type = 'text',
    select = false,
    options = [],
    value = '',
    size = 'small',
    valueSelector = 'id',
    labelSelector = 'name',
    ...inputProps
  } = props;
  return (
    <TextField
      type={type}
      fullWidth
      select={select}
      size={size}
      value={value || ''}
      id={id || inputProps.name}
      {...inputProps}
    >
      {select &&
        options.map((option) => (
          <MenuItem key={option[valueSelector]} value={option[valueSelector]}>
            {option[labelSelector]}
          </MenuItem>
        ))}
    </TextField>
  );
};
