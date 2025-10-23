import { MenuItem, TextField } from '@mui/material';

import { styles } from './styles';

export const RRVInput = (props) => {
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
