import React, { useEffect } from 'react';
import {
  Navbar,
  Nav,
  FormControl,
  Button,
  Dropdown,
  NavLink,
  NavItem,
} from 'react-bootstrap';
import { bgStyles, textStyles } from '../../utils/styles';
import { Logo } from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import { getNavCategories } from '../../redux/actions';

export const NavHeader = () => {
  const navCategories = useSelector(({ category }) => category.navCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNavCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNavCategories]);
  return (
    <Navbar collapseOnSelect expand='lg' style={bgStyles.bgPrimary}>
      <Logo />
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#features' style={textStyles.textTransparent}>
            Home
          </Nav.Link>
          {navCategories.map((nav, navIndex) =>
            !nav.categories.length ? (
              <Nav.Link
                href={`/${nav.slug}`}
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
                  {nav.categories.map((subNav, subNavIndex) => (
                    <Dropdown.Item href={`/${subNav.slug}`} key={subNavIndex}>
                      {subNav.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )
          )}
          <Nav.Link href='/admin' style={textStyles.textFtTitle}>
            Admin dashboard
          </Nav.Link>
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
  );
};
