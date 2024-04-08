import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { actions } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { useStyles } from '../../styles';
import { MainFooter } from '../Footer';
import { NavBar } from '../navbar';

export const UserMainLayout = () => {
  const classes = useStyles;
  const { data: catData } = actions.useGetNavsConfigQuery();
  const { data: categories } = catData || initials.dataArr;
  return (
    <Box>
      <NavBar navCategories={categories} />
      <main className={classes.content}>
        <Outlet />
      </main>
      <div style={{ marginTop: 10 }} />
      <MainFooter navCategories={categories} />
    </Box>
  );
};
