import React, { Fragment } from 'react';
import MarqueeText from 'react-marquee-text-component';
import {
  Navbar,
  Nav,
  FormControl,
  Button,
  Container,
  Alert,
  Dropdown,
  NavLink,
  NavItem,
} from 'react-bootstrap';
import { bgStyles, textStyles } from '../../utils/styles';
import { Logo } from './Logo';

const navs = [
  {
    name: 'Divinity truth',
    link: '#truth',
  },
  {
    name: 'Social life',
    link: '#truth',
    subNavs: [
      {
        name: 'Mariage',
        link: '#mariage',
      },
    ],
  },
  {
    name: 'The prophecy',
    link: '#truth',
  },
  {
    name: 'Preaching and songs',
    subNavs: [
      {
        name: 'Audio',
        link: '#truth',
      },
      {
        name: 'Video',
        link: '#truth',
      },
    ],
  },
];
export const Header = () => {
  return (
    <Fragment>
      <Navbar collapseOnSelect expand='lg' style={bgStyles.bgPrimary}>
        <Logo />
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#features' style={textStyles.textTransparent}>
              Home
            </Nav.Link>
            {navs.map((nav, navIndex) =>
              !nav.subNavs ? (
                <Nav.Link
                  href={nav.link}
                  style={textStyles.textTransparent}
                  key={navIndex}
                >
                  {nav.name}
                </Nav.Link>
              ) : (
                <Dropdown as={NavItem} key={navIndex}>
                  <Dropdown.Toggle
                    as={NavLink}
                    style={textStyles.textTransparent}
                  >
                    {nav.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {nav.subNavs.map((subNav, subNavIndex) => (
                      <Dropdown.Item href={subNav.link} key={subNavIndex}>
                        {subNav.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )
            )}
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
