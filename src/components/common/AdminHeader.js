import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { currentLang, systemLanguages } from '../../utils/constants';
import { translate } from '../utils';
import { logoutUser } from '../../redux/actions/user';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const AdminHeader = () => {
  const { done, message } = useSelector(({ lgUser }) => lgUser);
  const selectLanguage = (language) => {
    if (language === currentLang.abbr) return;
    localStorage.setItem('lang', language);
    window.location.reload();
  };
  useEffect(() => {
    if (done) {
      localStorage.removeItem('user');
      toast(message);
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);
  return (
    <header className='header'>
      <nav className='navbar'>
        <div className='search-box'>
          <button className='dismiss'>
            <i className='icon-close'></i>
          </button>
          <form id='searchForm' action='#' role='search'>
            <input
              type='search'
              placeholder='What are you looking for...'
              className='form-control'
            />
          </form>
        </div>
        <div className='container-fluid'>
          <div className='navbar-holder d-flex align-items-center justify-content-between'>
            <div className='navbar-header'>
              <Link to='/' className='navbar-brand d-none d-sm-inline-block'>
                <div className='brand-text d-none d-lg-inline-block'>
                  {translate('logoTitle')}
                </div>
                <div className='brand-text d-none d-sm-inline-block d-lg-none'>
                  <strong>BD</strong>
                </div>
              </Link>
              <Link id='toggle-btn' to='#' className='menu-btn active'>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </div>
            <ul className='nav-menu list-unstyled d-flex flex-md-row align-items-md-center'>
              <li className='nav-item d-flex align-items-center'>
                <Link id='search' to='#'>
                  <i className='icon-search'></i>
                </Link>
              </li>
              {/* Notifications */}
              <li className='nav-item dropdown'>
                <Link
                  id='languages'
                  rel='nofollow'
                  data-target='#'
                  to='#'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  className='nav-link language dropdown-toggle'
                >
                  <img src={currentLang.flag} alt={currentLang.lang} />
                  <span className='d-none d-sm-inline-block'>
                    {currentLang.lang}
                  </span>
                </Link>
                <ul aria-labelledby='languages' className='dropdown-menu'>
                  {systemLanguages.map((language, languageIndex) => (
                    <li
                      key={languageIndex}
                      onClick={() => selectLanguage(language.abbr)}
                    >
                      <Link rel='nofollow' to='#' className='dropdown-item'>
                        <img
                          src={language.flag}
                          alt={language.lang}
                          className='mr-2'
                        />
                        {language.lang}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className='nav-item'>
                <button
                  onClick={() => logoutUser()}
                  className='nav-link logout'
                >
                  <span className='d-none d-sm-inline'>Logout</span>
                  <i className='fa fa-sign-out'></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
