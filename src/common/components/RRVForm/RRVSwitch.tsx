import React from 'react';

import { FormControlLabel, Switch, type SwitchProps } from '@mui/material';

interface RRVSwitchProps extends SwitchProps {
  label?: React.ReactNode;
}

export const RRVSwitch: React.FC<RRVSwitchProps> = (props) => {
  const { value, label, name, onChange } = props;
  return (
    <FormControlLabel
      control={
        <Switch
          checked={value ?? false}
          onChange={onChange}
          name={name}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label={label}
    />
  );
};
