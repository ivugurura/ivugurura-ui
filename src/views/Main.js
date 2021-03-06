import React, { Suspense } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { renderRoutes } from 'react-router-config';
import { NavHeader, MainFooter } from '../components/common';

export const Main = ({ route }) => {
	return (
		<>
			<NavHeader />
			<Suspense fallback={<ProgressBar now />}>
				{renderRoutes(route.routes)}
			</Suspense>
			<MainFooter />
		</>
	);
};
