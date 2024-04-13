import React, { useMemo } from 'react';

import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  // Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  // Tooltip,
  Typography,
} from '@mui/material';

import { RRVDropdown } from '../RRVDropdown';
import { RRVSearch } from '../RRVSearch';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AdditionalMenu = () => (
  <>
    <Button variant="text">
      <Typography sx={{ color: 'white' }}>Audio</Typography>
    </Button>
    <Button variant="text">
      <Typography sx={{ color: 'white' }}>Contact Us</Typography>
    </Button>
  </>
);
export const NavBar = ({ navCategories = [] }) => {
  const categories = useMemo(
    () =>
      navCategories.map((category) => (
        <RRVDropdown
          key={category.id}
          title={category.name}
          variant="text"
          buttonProps={{
            sx: { color: 'white' },
          }}
          options={category.categories.map((cat) => (
            <Typography key={cat.id}>{cat.name}</Typography>
          ))}
        />
      )),
    [navCategories.length],
  );

  return (
    <AppBar
      position="sticky"
      sx={{ background: 'linear-gradient(59deg, #3a6073, #16222a)' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: 32,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UBUGOROZI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <RRVDropdown
              title={
                <IconButton color="inherit">
                  <MenuIcon />
                </IconButton>
              }
              size="large"
              options={categories}
              menuProps={{
                sx: {
                  display: { xs: 'block', md: 'none' },
                  color: 'inherit',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                keepMounted: true,
              }}
              buttonProps={{ endIcon: undefined }}
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UBUGOROZI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {categories}
            <AdditionalMenu />
            <RRVSearch />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <RRVDropdown
              title="Language"
              variant="text"
              options={['English', 'Kinyarwanda']}
              buttonProps={{
                sx: { color: 'white' },
              }}
            />
            {/* <RRVDropdown
              title={
                <Tooltip title="Open settings">
                  <IconButton size="small" sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      sx={{ width: 32, height: 32 }}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
              }
              variant="text"
              menuProps={{
                sx: {
                  mt: '45px',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
                keepMounted: true,
              }}
              buttonProps={{ endIcon: undefined, sx: { p: 0 } }}
              options={settings.map((setting) => (
                <Typography key={setting}>{setting}</Typography>
              ))}
            /> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
