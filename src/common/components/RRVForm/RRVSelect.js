import React from 'react';

import { Select, MenuItem } from '@mui/material';

import { FieldWrapper } from './FieldWrapper';

export const RRVSelect = (props) => {
  const {
    id,
    name,
    label,
    options = [],
    labelSelector = 'label',
    valueSelector = 'value',
    inputProps = {},
  } = props;
  return (
    <FieldWrapper {...props}>
      <Select
        labelId={`${name}-select-label`}
        id={id}
        label={label}
        {...inputProps}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option[valueSelector]} value={option[valueSelector]}>
            {option[labelSelector]}
          </MenuItem>
        ))}
      </Select>
    </FieldWrapper>
  );
};
