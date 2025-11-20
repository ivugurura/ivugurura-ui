import type React from 'react';

import {
  MenuItem,
  TextField,
  type TextFieldProps,
  type TextFieldPropsSizeOverrides,
} from '@mui/material';

import { styles } from './styles';

type OptionType = Record<string, string>;

interface RRVInputProps extends TextFieldProps {
  id?: string;
  type?: React.HTMLInputTypeAttribute;
  select?: boolean;
  size?: TextFieldPropsSizeOverrides;
  value: unknown;
  options: OptionType[];
  name?: string;
  valueSelector?: string;
  labelSelector?: string;
}

export const RRVInput: React.FC<RRVInputProps> = (props) => {
  const {
    id,
    type = 'text',
    select = false,
    options = [],
    value = '',
    size = 'medium',
    valueSelector = 'id',
    labelSelector = 'name',
    ...inputProps
  } = props;
  return (
    <TextField
      sx={styles.textfield}
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
