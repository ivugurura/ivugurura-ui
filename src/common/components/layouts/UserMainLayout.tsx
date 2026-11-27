import React from 'react';

import { Box } from '@mui/material';
import { actions, type QueryHook } from '@redux/actions';
import { Outlet } from 'react-router-dom';

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
    // Full-height column: the footer sits at the bottom even on short pages.
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      <NavBar navCategories={data?.data} />
      <AnnouncementBar />
      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </Box>
      <MainFooter navCategories={data?.data} />
    </Box>
  );
};
