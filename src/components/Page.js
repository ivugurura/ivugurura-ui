import React from 'react';
import { Helmet } from 'react-helmet';

export const Page = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title} - Ubugorozi</title>
      </Helmet>
      {children}
    </>
  );
};
