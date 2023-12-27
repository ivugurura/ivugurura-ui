import React from 'react';

import { Select, MenuItem } from '@mui/material';

import { FieldWrapper } from './FieldWrapper';

export const RRVSelect = (props) => {
  const {
    id,
    name,
    label,
    helperText,
    options = [],
    labelSelector = 'label',
    valueSelector = 'value',
    inputProps = {},
  } = props;
  return (
    <FieldWrapper name={name} label={label} helperText={helperText}>
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
