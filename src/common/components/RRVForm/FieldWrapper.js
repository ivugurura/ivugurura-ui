import React from 'react';

import {
  FormControl, InputLabel, FormHelperText,
} from '@mui/material';

export const FieldWrapper = ({
  id,
  name,
  fcProps = {},
  label,
  helperText,
  children,
}) => {
  <FormControl variant="standard" fullWidth {...fcProps}>
    <InputLabel htmlFor={id || name}>{label}</InputLabel>
    {children}
    {helperText && <FormHelperText id={`${name}-helper-text`}>{helperText}</FormHelperText>}
  </FormControl>;
};
