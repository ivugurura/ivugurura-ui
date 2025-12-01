import React from 'react';

import {
  DatePicker,
  LocalizationProvider,
  type DatePickerProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type Dayjs } from 'dayjs';

type RRVDateInputProps = DatePickerProps<Dayjs, Dayjs>;

export const RRVDateInput: React.FC<RRVDateInputProps> = (props) => {
  const { value, ...otherProps } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value || null} {...otherProps} />
    </LocalizationProvider>
  );
};
