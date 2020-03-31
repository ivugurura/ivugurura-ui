import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';
import { configureStore } from './redux/store';
import { testReducerAction } from './redux/actions';
import { routes } from './routes';
import { mainTheme } from './helpers';

const store = configureStore;
store.dispatch(testReducerAction());
export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <Router>{renderRoutes(routes)}</Router>
      </ThemeProvider>
    </Provider>
  );
};
