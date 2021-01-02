import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'suneditor/dist/css/suneditor.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-chat-widget/lib/styles.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { ProgressBar } from 'react-bootstrap';

const isDev = process.env.NODE_ENV === 'development';
ReactDOM.render(
	<Suspense fallback={<ProgressBar now />}>
		<App />
	</Suspense>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (isDev) {
	serviceWorker.unregister();
} else {
	serviceWorker.unregister();
}
