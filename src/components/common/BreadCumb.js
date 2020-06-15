import React from 'react';
import { Link } from 'react-router-dom';

export const BreadCumb = ({ routes }) => {
  return (
    <header className='page-header'>
      <div className='breadcrumb-holder container-fluid'>
        <ul className='breadcrumb'>
          {routes.map((route, routeIndex) =>
            route.link ? (
              <li className='breadcrumb-item' key={routeIndex}>
                <Link to={route.link}>{route.name}</Link>
              </li>
            ) : (
              <li className='breadcrumb-item active' key={routeIndex}>
                {route.name}
              </li>
            )
          )}
        </ul>
      </div>
    </header>
  );
};
