import React from 'react';
import { Card } from 'react-bootstrap';

export const CardCounter = ({ color, count, title }) => {
  return (
    <div class='col-xl-3 col-sm-6'>
      <div class='item d-flex align-items-center'>
        <div class={`icon bg-${color}`}>
          <i class='icon-padnote'></i>
        </div>
        <div class='title'>
          <span>{title}</span>
          <div class='progress'>
            <div
              role='progressbar'
              aria-valuenow='25'
              style={{ width: '100%', height: '4px' }}
              aria-valuemin='0'
              aria-valuemax='100'
              class={`progress-bar bg-${color}`}
            ></div>
          </div>
        </div>
        <div class='number'>
          <strong>{count}</strong>
        </div>
      </div>
    </div>
  );
};
