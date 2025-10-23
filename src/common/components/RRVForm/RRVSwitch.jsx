import { FormControlLabel, Switch } from '@mui/material';

export const RRVSwitch = (props) => {
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
