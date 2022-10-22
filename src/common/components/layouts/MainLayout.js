import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useStyles } from '../../styles';
import { Footer } from '../Footer';
import { NavBar } from '../navbar';

export const MainLayout = () => {
  const classes = useStyles();
  return (
    <Box>
      <NavBar />
      <main className={classes.content}>
        <Outlet />
      </main>
      <div style={{ marginTop: 10 }} />
      <Footer />
    </Box>
  );
};
