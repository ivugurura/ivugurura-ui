// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

import { middlewares, reducers } from './apiSliceBuilder';
// import promise from 'redux-promise-middleware';
// import thunk from 'redux-thunk';

// import { errorHandler } from './errorHandler';
// import { rootReducer } from './reducers';

// const withMiddlware = process.env.NODE_ENV === 'development'
//   ? composeWithDevTools(applyMiddleware(errorHandler, thunk, promise))
//   : applyMiddleware(errorHandler, thunk, promise);
// export const store = createStore(rootReducer, {}, withMiddlware);

// const configuredSlides = apiReducers();
export const store = configureStore({
  reducer: {
    ...reducers,
  },
  devTools: true,
  // ? Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
    .concat(middlewares),
});
