import React from 'react';
// import 'custom-styles';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div id='notfound'>
      <div className='notfound'>
        <div className='notfound-404'>
          <h1>
            4<span></span>4
          </h1>
        </div>
        <h2>Oops! You are not authorised</h2>
        <p>
          Sorry but the page you are looking for is reserved to the System admin
          and Editors. Because you are not one of them, I hope you don't mind
          turning back
        </p>
        <Link to='/'>Back to homepage</Link>
      </div>
    </div>
  );
};
