import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { actions } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { MainFooter } from '../Footer';
import { NavBar } from '../navbar';

export const UserMainLayout = () => {
  const { data: catData } = actions.useGetNavsConfigQuery();
  const { data: categories } = catData || initials.dataArr;
  return (
    <Box>
      <NavBar navCategories={categories} />
      <main>
        <Outlet />
      </main>
      <div style={{ marginTop: 10 }} />
      <MainFooter navCategories={categories} />
    </Box>
  );
};
