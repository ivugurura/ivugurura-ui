import type React from 'react';

import { FormControlLabel, Switch } from '@mui/material';

interface RRVSwitchProps {
  value?: boolean;
  label: React.ReactNode;
  name: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
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
