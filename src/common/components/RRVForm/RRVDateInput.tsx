import React from 'react';

import {
  DatePicker,
  LocalizationProvider,
  type DatePickerProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type Dayjs } from 'dayjs';

interface RRVDateInputProps
  extends Omit<DatePickerProps<Dayjs, Dayjs>, 'onChange'> {
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null) => void;
}

export const RRVDateInput: React.FC<RRVDateInputProps> = (props) => {
  const { value, ...otherProps } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value || null} {...otherProps} />
    </LocalizationProvider>
  );
};
