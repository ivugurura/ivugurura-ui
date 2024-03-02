import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useStyles } from '../../styles';
// import { Footer } from '../Footer';
import { MainFooter } from '../Footer';
import { NavBar } from '../navbar';

export const UserMainLayout = () => {
  const classes = useStyles;
  return (
    <Box>
      <NavBar />
      <main className={classes.content}>
        <Outlet />
      </main>
      <div style={{ marginTop: 10 }} />
      <MainFooter />
    </Box>
  );
};
