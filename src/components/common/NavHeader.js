import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Nav,
  FormControl,
  Button,
  Dropdown,
  NavLink,
  Form,
  NavItem,
} from 'react-bootstrap';
import { bgStyles, textStyles } from '../../utils/styles';
import { Logo } from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import { getNavCategories, setLanguage } from '../../redux/actions';
import { systemLanguages } from '../../utils/constants';
import { translate } from '../utils';

export const NavHeader = () => {
  const systemLanguage = localStorage.getItem('lang');
  const [lang, setLang] = useState(systemLanguage);
  const navCategories = useSelector(({ category }) => category.navCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNavCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNavCategories, setLanguage]);
  const selectLanguage = (e) => {
    const newLang = e.target.value;
    localStorage.setItem('lang', newLang);
    setLang(newLang);
    dispatch(setLanguage(newLang));
    window.location.href = '/';
  };
  return (
    <Navbar collapseOnSelect expand='lg' style={bgStyles.bgPrimary}>
      <Logo />
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#features' style={textStyles.textTransparent}>
            {translate('home')}
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
          <Nav.Link href='#pricing' style={textStyles.textTransparent}>
            {translate('contactUs')}
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type='text'
            placeholder='Search'
            className='mr-sm-2'
            size='sm'
          />
          <Button variant='danger' size='sm'>
            {translate('listenRadio')}
          </Button>
          <Form.Control
            as='select'
            size='sm'
            name='language'
            value={lang}
            onChange={selectLanguage}
          >
            {systemLanguages.map((language, index) => (
              <option key={index} value={language.abbr}>
                {language.lang}
              </option>
            ))}
          </Form.Control>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};
