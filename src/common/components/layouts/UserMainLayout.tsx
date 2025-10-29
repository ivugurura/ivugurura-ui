import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { actions } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { useLangRedirect } from '../../hooks/useLangRedirect';
import { AnnouncementBar } from '../AnnouncementBar';
import { MainFooter } from '../Footer';
import { NavBar } from '../navbar';

interface UserMainLayoutProps {
  lang: string;
}

export const UserMainLayout: React.FC<UserMainLayoutProps> = ({ lang }) => {
  const { data: catData } = actions.useGetNavsConfigQuery();
  const { data: categories } = catData || initials.dataArr();

  useLangRedirect(lang);
  return (
    <Box>
      <NavBar navCategories={categories} />
      <AnnouncementBar />
      <main>
        <Outlet />
      </main>
      <div style={{ marginTop: 10 }} />
      <MainFooter navCategories={categories} />
    </Box>
  );
};
