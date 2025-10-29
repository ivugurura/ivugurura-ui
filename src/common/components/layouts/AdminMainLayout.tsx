import React from 'react';

import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import type { RootState } from '@reduxjs/toolkit/query';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Login from '../../../pages/admin/Login';
import { useLangRedirect } from '../../hooks/useLangRedirect';
// import { AnnouncementBar } from '../AnnouncementBar';
import { useAuth } from '../providers';

import { AdminMenuDrawer } from './components/AdminMenuDrawer';
import { SuspenseFallback } from './SuspenseFallback';
import type { RootState } from '@reduxjs/toolkit/query';

interface AdminMainLayout {
  lang: string;
}

const drawerWidth = 240;
export const AdminMainLayout: React.FC<AdminMainLayoutProps> = ({ lang }) => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isLoading } = useAuth();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  useLangRedirect(lang);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        title="Admin Dash"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap component="div">
            RRV - {t('admin.home.title')}
            {isAuthenticated ? ` - ${user.names}` : ''}
          </Typography>
        </Toolbar>
      </AppBar>

      {isAuthenticated && (
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="RRV Menu"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <AdminMenuDrawer />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            <AdminMenuDrawer />
          </Drawer>
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)`, marginTop: '30px' },
        }}
      >
        {/* <AnnouncementBar /> */}
        {!isAuthenticated && !isLoading && <Login shouldRedirect={false} />}
        {isLoading && <SuspenseFallback message={t('admin.home.loading')} />}
        {isAuthenticated && <Outlet />}
      </Box>
    </Box>
  );
};
