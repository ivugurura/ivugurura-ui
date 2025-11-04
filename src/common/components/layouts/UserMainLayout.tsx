import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { actions, type QueryHook } from '../../../redux/actions';
import { useLangRedirect } from '../../hooks/useLangRedirect';
import { AnnouncementBar } from '../AnnouncementBar';
import { MainFooter } from '../Footer';
import { NavBar } from '../navbar';

interface UserMainLayoutProps {
  lang: string;
}

export const UserMainLayout: React.FC<UserMainLayoutProps> = ({ lang }) => {
  const useGetNavsConfig = actions.useGetNavsConfigQuery as QueryHook<
    APP.ICategory[]
  >;
  const { data } = useGetNavsConfig();

  useLangRedirect(lang);
  return (
    <Box>
      <NavBar navCategories={data?.data} />
      <AnnouncementBar />
      <main>
        <Outlet />
      </main>
      <div style={{ marginTop: 10 }} />
      <MainFooter navCategories={data?.data} />
    </Box>
  );
};
