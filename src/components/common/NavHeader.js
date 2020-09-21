import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Nav,
  FormControl,
  Button,
  Dropdown,
  NavLink,
  Form,
  NavItem
} from 'react-bootstrap';
import { bgStyles, textStyles } from '../../utils/styles';
import { Logo } from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, setLanguage } from '../../redux/actions';
import { currentLang, systemLanguages } from '../../utils/constants';
import { translate } from '../utils';
import { Link } from 'react-router-dom';
import { SearchBox, ContactUs } from '../models';

export const NavHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const { navCategories } = useSelector(({ category }) => category);
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories('/navs');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLanguage]);
  const selectLanguage = (newLang) => {
    localStorage.setItem('lang', newLang);
    dispatch(setLanguage(newLang));
    window.location.href = '/';
  };
  return (
    <Navbar collapseOnSelect expand='lg' style={bgStyles.bgPrimary}>
      <Logo />
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/' style={textStyles.textTransparent}>
            {translate('home')}
          </Nav.Link>
          {navCategories.map((nav, navIndex) =>
            !nav.categories.length ? (
              <Nav.Link style={textStyles.textTransparent} key={navIndex}>
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
                    <Dropdown.Item key={subNavIndex}>
                      <Link to={`/topics/categories/${subNav.slug}`}>
                        {subNav.name}
                      </Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )
          )}
          <Nav.Link
            href='#'
            style={textStyles.textTransparent}
            onClick={() => setShowContactUs(true)}
          >
            {translate('contactUs')}
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type='text'
            placeholder='Search'
            className='mr-sm-2'
            size='sm'
            onPointerEnter={() => setShowSearch(true)}
          />
          <Button variant='danger' size='sm'>
            {translate('listenRadio')}
          </Button>
          {/* <Form.Control
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
          </Form.Control> */}
        </Form>
        <Link
          id='languages'
          rel='nofollow'
          data-target='#'
          to='#'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
          className='nav-link language dropdown-toggle'
          style={textStyles.textTransparent}
        >
          <img src={currentLang.flag} alt={currentLang.lang} />
          <span className='d-none d-sm-inline-block'>{currentLang.lang}</span>
        </Link>
        <ul aria-labelledby='languages' className='dropdown-menu'>
          {systemLanguages.map((language, languageIndex) => (
            <li
              key={languageIndex}
              onClick={() => selectLanguage(language.abbr)}
            >
              <Link rel='nofollow' to='#' className='dropdown-item'>
                <img src={language.flag} alt={language.lang} className='mr-2' />
                {language.lang}
              </Link>
            </li>
          ))}
        </ul>
      </Navbar.Collapse>
      <SearchBox show={showSearch} onHide={() => setShowSearch(false)} />
      <ContactUs
        show={showContactUs}
        handleClose={() => setShowContactUs(false)}
      />
    </Navbar>
  );
};
