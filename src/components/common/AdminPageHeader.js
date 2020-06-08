import React from 'react';

export const AdminPageHeader = ({ name, btnTitle, btnAction }) => {
  return (
    <header className='page-header'>
      <div className='container-fluid'>
        <h2 className='no-margin-bottom'>{name}</h2>
        <button className='btn btn-primary pull-right' onClick={btnAction}>
          {btnTitle}
        </button>
      </div>
    </header>
  );
};
