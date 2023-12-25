import React from 'react';

import { Input } from '@mui/material';

import { FieldWrapper } from './FieldWrapper';

export const RRVInput = (props) => {
  const {
    id,
    name,
    type = 'text',
    inputProps = {},
  } = props;
  return (
    <FieldWrapper {...props}>
      <Input id={id || name} aria-describedby={`${name}-helper-text`} type={type} {...inputProps} />
    </FieldWrapper>
  );
};
