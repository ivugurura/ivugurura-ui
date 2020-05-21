import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { bgStyles, textStyles } from '../utils/styles';
import { Logo, Footer } from '../components/common';
import { useSelector } from 'react-redux';
import { NotFound } from '../components';

export const AdminMain = ({ route }) => {
  const { isAuthenticated } = useSelector(({ user }) => user);
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
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <NotFound />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      )}
      <Footer />
    </Fragment>
  );
};
