import { configureStore } from '@reduxjs/toolkit';

import { middlewares, reducers } from './apiSliceBuilder';
import { authUserSlice, filePathSlice } from './constantSlices';
import { rtkQueryErrorLogger } from './errorHandler';

export const store = configureStore({
  reducer: {
    filer: filePathSlice.reducer,
    auth: authUserSlice.reducer,
    ...reducers,
  },
  devTools: true,
  // ? Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // prettier-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
    .concat(middlewares, rtkQueryErrorLogger),
});

export type AppState = ReturnType<typeof store.getState>;
