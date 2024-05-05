import React, { useMemo, useState } from 'react';

import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { systemLanguages, toLink } from '../../../helpers/utils/constants';
import { useLang } from '../providers';
import { RRVDropdown } from '../RRVDropdown';
import { RRVSearch } from '../RRVSearch';

import { SearchModal } from './SearchModal';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AdditionalMenu = ({ navigate, t }) => {
  return (
    <>
      <Button
        variant="text"
        onClick={() => navigate(toLink('audios'))}
        sx={{ textTransform: 'none' }}
      >
        <Typography sx={{ color: 'white' }}>{t('audios')}</Typography>
      </Button>
      <Button variant="text">
        <Typography sx={{ color: 'white' }}>{t('contactUs')}</Typography>
      </Button>
    </>
  );
};
export const NavBar = ({ navCategories = [] }) => {
  const { t } = useTranslation();
  const { lang, changeLang } = useLang();
  const navigate = useNavigate();
  const [openSearch, setOpenSearch] = useState(false);
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
            <Button
              variant="text"
              key={cat.id}
              onClick={() => navigate(toLink(`topics?t=${cat.slug}`))}
            >
              {cat.name}
            </Button>
          ))}
        />
      )),
    [navCategories.length],
  );

  const currentLang = useMemo(
    () => systemLanguages.find(({ abbr }) => abbr === lang),
    [lang],
  );
  return (
    <AppBar position="sticky" className="bg-gradient">
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
              title={<MenuIcon />}
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
            <AdditionalMenu navigate={navigate} t={t} />
            <RRVSearch onClick={() => setOpenSearch(true)} />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <RRVDropdown
              title={
                <>
                  <img src={currentLang?.flag} alt={currentLang?.abbr} />{' '}
                  {currentLang?.lang}
                </>
              }
              variant="text"
              options={systemLanguages.map((sl) => (
                <Button
                  startIcon={<img src={sl.flag} alt={sl.abbr} />}
                  key={sl.abbr}
                  onClick={() => changeLang(sl.abbr)}
                >
                  {sl.lang}
                </Button>
              ))}
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
      <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
    </AppBar>
  );
};
