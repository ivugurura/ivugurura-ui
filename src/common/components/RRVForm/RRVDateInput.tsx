import React from 'react';

import {
  DatePicker,
  LocalizationProvider,
  type DatePickerProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type Dayjs } from 'dayjs';

// RRVForm passes its generic field row (value: unknown) straight through.
type RRVDateInputProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  value?: unknown;
  onChange?: (value: Dayjs | null) => void;
  isBool?: boolean;
};

export const RRVDateInput: React.FC<RRVDateInputProps> = (props) => {
  const { value, isBool: _isBool, ...otherProps } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={(value as Dayjs | null) || null} {...otherProps} />
    </LocalizationProvider>
  );
};
