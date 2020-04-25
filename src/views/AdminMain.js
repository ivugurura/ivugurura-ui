import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import { Navbar } from 'react-bootstrap';
import { bgStyles } from '../utils/styles';
import { Logo, Footer } from '../components/common';

export const AdminMain = ({ route }) => {
  return (
    <Fragment>
      <Navbar style={bgStyles.bgPrimary}>
        <Logo />
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'></Navbar.Collapse>
      </Navbar>
      {renderRoutes(route.routes)}
      <Footer />
    </Fragment>
  );
};
