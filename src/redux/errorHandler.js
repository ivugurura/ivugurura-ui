import { isRejectedWithValue } from '@reduxjs/toolkit';
import isPromise from 'is-promise';
import { toast } from 'react-toastify';

export const errorHandler = () => (next) => (action) => {
  if (!isPromise(action.payload)) {
    return next(action);
  }

  if (!action.meta || !action.meta.localError) {
    return next(action).catch((error) => {
      let errorMessage = '';
      if (error.response) {
        const { error: message } = error.response.data;
        errorMessage = message;
      } else {
        errorMessage = error.message;
      }
      toast(errorMessage, {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: 13,
      });
    });
  }

  return next(action);
};
// import { toast } from 'your-cool-library'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood,
  // so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    let errorMessage = 'Rejected';
    if (action.payload?.data) {
      errorMessage = action.payload?.data.message;
    }
    console.log('We got a rejected action!');
    console.log(action);
    toast(errorMessage, {
      type: toast.TYPE.ERROR,
      position: toast.POSITION.BOTTOM_RIGHT,
      toastId: 13,
    });
    // toast.error({
    //   title: 'Async error!',
    //   message: errorMessage,
    //   type: toast.TYPE.ERROR,
    //   position: toast.POSITION.BOTTOM_RIGHT,
    //   toastId: 13,
    // });
  }

  return next(action);
};
