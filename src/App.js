import React from 'react';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store';
import { routes } from './routes';
import { LangProvider } from './components';
import { setUser } from './redux/actions';
import './i18n';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation(['app']);
	return (
		<Provider store={store}>
			<LangProvider>
				<ToastContainer />
				<Router>{renderRoutes(routes, { t })}</Router>
			</LangProvider>
		</Provider>
	);
};
