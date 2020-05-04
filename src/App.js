import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { store } from './redux/store';
import { routes } from './routes';
import { LangProvider } from './components';
import { setLanguage } from './redux/actions';

let systemLanguage = localStorage.getItem('lang');
if (!systemLanguage) {
  localStorage.setItem('lang', 'kn');
  systemLanguage = 'kn';
}
store.dispatch(setLanguage(systemLanguage));
export const App = () => {
  return (
    <Provider store={store}>
      <LangProvider>
        <Router>{renderRoutes(routes)}</Router>
      </LangProvider>
    </Provider>
  );
};
