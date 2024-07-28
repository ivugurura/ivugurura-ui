import React from 'react';

import { Helmet } from 'react-helmet';

export const PageHelmet = ({ title, children }) => {
  console.log('Page helmet');
  return (
    <>
      <Helmet>
        <title>{title} - Ubugorozi</title>
      </Helmet>
      {children}
    </>
  );
};
