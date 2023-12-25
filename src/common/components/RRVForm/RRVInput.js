import React from 'react';

import {
  FormControl, Input, InputLabel, FormHelperText,
} from '@mui/material';

export const RRVInput = ({
  id,
  label,
  name,
  helperText,
  type = 'text',
  inputProps = {},
  fcProps = {},
}) => (
  <FormControl variant="standard" fullWidth {...fcProps}>
    <InputLabel htmlFor={id || name}>{label}</InputLabel>
    <Input id={id || name} aria-describedby="my-helper-text" type={type} {...inputProps} />
    {helperText && <FormHelperText id="my-helper-text">{helperText}</FormHelperText>}
  </FormControl>
);
