import isPromise from 'is-promise';

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
        console.log('Error message', error.message);
        console.log('handled error:', errorMessage);
      });
    }

    return next(action);
  };
};
export const error = (serverResponse) => {
  let errorMessage = '';
  if (serverResponse.response) {
    const { error: message } = serverResponse.response.data;
    errorMessage = message;
  } else {
    errorMessage = serverResponse.message;
  }
  return errorMessage;
};
