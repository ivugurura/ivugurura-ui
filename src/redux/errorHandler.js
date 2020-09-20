import isPromise from 'is-promise';
import { toast } from 'react-toastify';

export const errorHandler = () => {
  return (next) => (action) => {
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
};
