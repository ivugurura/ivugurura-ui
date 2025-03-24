import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood,
  // so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    let errorMessage = action.payload?.error;
    if (action.payload?.data) {
      errorMessage = action.payload?.data.error;
    }
    toast.error(errorMessage, {
      position: 'bottom-right',
      toastId: 13,
    });
  }

  return next(action);
};
