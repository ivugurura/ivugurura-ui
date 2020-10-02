import React from 'react';
import { AdminHeader, AdminSideNav } from '../components/common';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';

export const AdminMain = ({ route, history }) => {
  const { isAuthenticated } = useSelector(({ user }) => user);
  if (!isAuthenticated) {
    toast('Sorry you are not authenticated', { toastId: 41 });
    setTimeout(() => {
      window.location.replace('/login');
    }, 3000);
  }
  return (
    <div className='page'>
      <AdminHeader />
      {isAuthenticated ? (
        <div className='page-content d-flex align-items-stretch'>
          <AdminSideNav />
          <div className='content-inner'>{renderRoutes(route.routes)}</div>
        </div>
      ) : (
        <Container>
          <h4 className='text-center'>This page is reseved for administator</h4>
        </Container>
      )}
    </div>
  );
};
