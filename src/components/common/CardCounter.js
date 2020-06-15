import React from 'react';

export const CardCounter = ({ color, count, title }) => {
  return (
    <div className='col-xl-3 col-sm-6'>
      <div className='item d-flex align-items-center'>
        <div className={`icon bg-${color}`}>
          <i className='icon-padnote'></i>
        </div>
        <div className='title'>
          <span>{title}</span>
          <div className='progress'>
            <div
              role='progressbar'
              aria-valuenow='25'
              style={{ width: '100%', height: '4px' }}
              aria-valuemin='0'
              aria-valuemax='100'
              className={`progress-bar bg-${color}`}
            ></div>
          </div>
        </div>
        <div className='number'>
          <strong>{count}</strong>
        </div>
      </div>
    </div>
  );
};
