import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const profileUrl = `${process.env.PUBLIC_URL}/img/avatar-1.jpg`;
export const AdminSideNav = () => {
  const { info } = useSelector(({ user }) => user);
  return (
    <nav className='side-navbar'>
      <div className='sidebar-header d-flex align-items-center'>
        <div className='avatar'>
          <img
            src={profileUrl}
            alt='...'
            className='img-fluid rounded-circle'
          />
        </div>
        <div className='title'>
          <h4>{info.names}</h4>
          <p>Administrator</p>
        </div>
      </div>
      <span className='heading'>Main</span>
      <ul className='list-unstyled'>
        <li className=''>
          <Link to='/admin'>
            <i className='icon-home'></i>Dashboard
          </Link>
        </li>
        <li>
          <a href='#topic' aria-expanded='false' data-toggle='collapse'>
            <i className='icon-interface-windows'></i>Topic
          </a>
          <ul id='topic' className='collapse list-unstyled'>
            <li>
              <Link to='/admin/add-topic'>Add new</Link>
            </li>
          </ul>
        </li>
        <li>
          <a href='#media' aria-expanded='false' data-toggle='collapse'>
            <i className='icon-grid'></i>Media
          </a>
          <ul id='media' className='collapse list-unstyled'>
            <li>
              <Link to='/admin/audios'>Audios</Link>
              <Link to='/admin/videos'>Videos</Link>
            </li>
          </ul>
        </li>
      </ul>
      <span className='heading'>Extras</span>
      <ul className='list-unstyled'>
        <li>
          <Link to='/admin/setting'>
            <i className='icon-screen'></i>Setting
          </Link>
        </li>
        <li>
          <Link to='/admin/commentaries'>
            <i className='icon-grid'></i>Commentaries
          </Link>
        </li>
      </ul>
    </nav>
  );
};
