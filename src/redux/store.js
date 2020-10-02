import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import { errorHandler } from './errorHandler';

const withMiddlware =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(errorHandler, thunk, promise))
    : applyMiddleware(errorHandler, thunk, promise);
export const store = createStore(rootReducer, {}, withMiddlware);
