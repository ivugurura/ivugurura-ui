import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import { Navbar, Nav } from 'react-bootstrap';
import { bgStyles, textStyles } from '../utils/styles';
import { Logo, Footer } from '../components/common';
import { useSelector } from 'react-redux';

export const AdminMain = ({ route }) => {
  const { info, isAuthenticated } = useSelector(({ user }) => user);
  return (
    <Fragment>
      <Navbar style={bgStyles.bgPrimary}>
        <Logo />
        <Navbar.Toggle />
        {/* <Navbar.Collapse className='justify-content-end'></Navbar.Collapse> */}
        <Nav.Link href='/' style={textStyles.textTransparent}>
          Home
        </Nav.Link>
      </Navbar>
      {isAuthenticated ? (
        renderRoutes(route.routes)
      ) : (
        <h4>Sorry you are not authorised</h4>
      )}
      <Footer />
    </Fragment>
  );
};
