import React from 'react';
import { Link } from 'react-router-dom';

export const AdminHeader = () => {
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
                  <span>Ijwi ry </span>
                  <strong>Ubugorozi</strong>
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
                  <img src='img/flags/16/GB.png' alt='English' />
                  <span className='d-none d-sm-inline-block'>English</span>
                </Link>
                <ul aria-labelledby='languages' className='dropdown-menu'>
                  <li>
                    <Link rel='nofollow' to='#' className='dropdown-item'>
                      <img
                        src='img/flags/16/DE.png'
                        alt='English'
                        className='mr-2'
                      />
                      German
                    </Link>
                  </li>
                  <li>
                    <Link rel='nofollow' to='#' className='dropdown-item'>
                      <img
                        src='img/flags/16/FR.png'
                        alt='English'
                        className='mr-2'
                      />
                      French
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='nav-item'>
                <a href='login.html' className='nav-link logout'>
                  <span className='d-none d-sm-inline'>Logout</span>
                  <i className='fa fa-sign-out'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
