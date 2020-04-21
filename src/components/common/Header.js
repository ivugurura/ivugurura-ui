import React, { Fragment } from 'react';
import MarqueeText from 'react-marquee-text-component';
import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Container,
  Alert,
} from 'react-bootstrap';
import { bgStyles, textStyles } from '../../utils/styles';

export const Header = () => {
  return (
    <Fragment>
      <Navbar collapseOnSelect expand='lg' style={bgStyles.bgPrimary}>
        <Navbar.Brand href='#home' style={textStyles.textTransparent}>
          Ubugorozi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#features' style={textStyles.textTransparent}>
              Home
            </Nav.Link>
            <Nav.Link href='#pricing' style={textStyles.textTransparent}>
              Divinity truth
            </Nav.Link>
            <Nav.Link href='#pricing' style={textStyles.textTransparent}>
              Social life
            </Nav.Link>
            <Nav.Link href='#pricing' style={textStyles.textTransparent}>
              The prophrcy
            </Nav.Link>
            <NavDropdown
              title='Preaching and songs'
              id='collasible-nav-dropdown'
              bsPrefix='nav-link'
            >
              <NavDropdown.Item href='#action/3.1'>Audio</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Video</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
            <Nav.Link href='#pricing' style={textStyles.textTransparent}>
              Contact us
            </Nav.Link>
          </Nav>
          <Nav className='mr-auto'>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          </Nav>
          <Button variant='danger'>Umva Radio</Button>
        </Navbar.Collapse>
      </Navbar>
      <Container className='mt-2' fluid>
        <Alert variant='danger'>
          <h4>
            <MarqueeText text='Itangazo: Muratumiwe mu materaniro' repeat={1} />
          </h4>
        </Alert>
      </Container>
    </Fragment>
  );
};
