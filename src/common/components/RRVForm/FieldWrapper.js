import React from 'react';

import {
  FormControl, InputLabel, FormHelperText,
} from '@mui/material';

export const FieldWrapper = ({
  name,
  fcProps = {},
  label,
  helperText,
  children,
}) => {
  <FormControl variant="standard" fullWidth {...fcProps}>
    <InputLabel id={`${name}-input-id`} htmlFor={`${name}-input-label`}>{label}</InputLabel>
    {children}
    {helperText && <FormHelperText id={`${name}-helper-text`}>{helperText}</FormHelperText>}
  </FormControl>;
};
