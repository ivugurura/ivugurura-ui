import React from 'react';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store';
import { routes } from './routes';
import { LangProvider } from './components';
import { setLanguage, setUser } from './redux/actions';

let systemLanguage = localStorage.getItem('lang');
if (!systemLanguage) {
  localStorage.setItem('lang', 'kn');
  systemLanguage = 'kn';
}
store.dispatch(setLanguage(systemLanguage));
if (localStorage.user) {
  const user = JSON.parse(localStorage.user);
  if (user.token) {
    const tokenInfo = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    store.dispatch(setUser(user));

    if (tokenInfo.exp < currentTime) {
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  }
}
export const App = () => {
  return (
    <Provider store={store}>
      <LangProvider>
        <ToastContainer />
        <Router>{renderRoutes(routes)}</Router>
      </LangProvider>
    </Provider>
  );
};
