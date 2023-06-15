import { configureStore } from '@reduxjs/toolkit';

import { middlewares, reducers } from './apiSliceBuilder';
import { rtkQueryErrorLogger } from './errorHandler';

export const store = configureStore({
  reducer: {
    ...reducers,
  },
  devTools: true,
  // ? Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
    .concat(middlewares, rtkQueryErrorLogger),
});
