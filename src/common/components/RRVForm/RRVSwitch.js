import React from 'react';

import { FormControlLabel, Switch } from '@mui/material';

export const RRVSwitch = (props) => {
  const {
    value, label, name, onChange,
  } = props;
  console.log('======>rs', { value });
  return (
    <FormControlLabel
      control={<Switch checked={value === 'on'} onChange={onChange} name={name} />}
      label={label}
    />
  );
};
