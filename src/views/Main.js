import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import { Footer, NavHeader } from '../components/common';

export const Main = ({ route }) => {
  return (
    <Fragment>
      <NavHeader />
      {renderRoutes(route.routes)}
      <Footer isHomepage />
    </Fragment>
  );
};
