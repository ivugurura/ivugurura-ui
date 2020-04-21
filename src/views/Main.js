import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import { Footer, Header } from '../components/common';

export const Main = ({ route }) => {
  return (
    <Fragment>
      <Header />
      {renderRoutes(route.routes)}
      <Footer />
    </Fragment>
  );
};
