import React, { Suspense } from 'react';
import { AdminHeader, AdminSideNav } from '../components/common';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { toast } from 'react-toastify';
import { Container, ProgressBar } from 'react-bootstrap';
import { systemLanguage } from 'utils/constants';

export const AdminMain = ({ route }) => {
	const { isAuthenticated } = useSelector(({ user }) => user);
	if (!isAuthenticated) {
		toast('Sorry you are not authenticated', { toastId: 41 });
		setTimeout(() => {
			window.location.replace(`/${systemLanguage}/login`);
		}, 3000);
	}
	return (
		<div className='page'>
			<AdminHeader />
			{isAuthenticated ? (
				<div className='page-content d-flex align-items-stretch'>
					<AdminSideNav />
					<Suspense fallback={<ProgressBar now />}>
						<div className='content-inner'>{renderRoutes(route.routes)}</div>
					</Suspense>
				</div>
			) : (
				<Container>
					<h4 className='text-center'>This page is reseved for administator</h4>
				</Container>
			)}
		</div>
	);
};
