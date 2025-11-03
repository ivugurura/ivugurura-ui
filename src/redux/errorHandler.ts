import {
  isRejectedWithValue,
  type Middleware,
  type MiddlewareAPI,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface ErrorPayload {
  error?: string;
  data?: {
    error?: string;
  };
}

interface RejectedAction {
  type: string;
  payload?: ErrorPayload;
}
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (_: MiddlewareAPI) => (next) => (action: RejectedAction) => {
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
