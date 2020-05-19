import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import { errorHandler } from './errorHandler';

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(errorHandler, thunk, promise))
);
