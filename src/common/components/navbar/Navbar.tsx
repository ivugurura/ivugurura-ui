import React, { useState } from 'react';

import {
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { toLink } from '../../../helpers/utils/constants';
import { useLang } from '../providers';
import { RRVDropdown } from '../RRVDropdown';
import { RRVSearch } from '../RRVSearch';
import { SelectLanguage } from '../SelectLanguage';

import { ContactModal } from './ContactModal';
import { SearchModal } from './SearchModal';

interface NavBarProps {
  navCategories?: APP.ICategory[];
}

interface NavLink {
  label: string;
  /** Route under the current language, e.g. `library`. */
  link?: string;
  onClick?: () => void;
}

const drawerWidth = 280;

const navButtonSx = {
  color: 'common.white',
  fontWeight: 500,
  px: 1.5,
  whiteSpace: 'nowrap',
  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
} as const;

const activeSx = { backgroundColor: 'rgba(255, 255, 255, 0.12)' } as const;

export const NavBar: React.FC<NavBarProps> = ({ navCategories = [] }) => {
  const { t } = useTranslation();
  const { lang } = useLang();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openSearch, setOpenSearch] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [openContactForm, setOpenContactForm] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    null,
  );

  const links: NavLink[] = [
    { label: t('library.menuTitle'), link: 'library' },
    { label: t('audios'), link: 'audios' },
    { label: t('contactUs'), onClick: () => setOpenContactForm(true) },
  ];
  const isActive = (link?: string) =>
    Boolean(link) && pathname.startsWith(toLink(link));

  const goTo = (link: string) => {
    setMobileOpen(false);
    navigate(toLink(link));
  };

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(value);
    setOpenSearch(true);
  };

  const logo = (
    <Typography
      variant="h5"
      noWrap
      component={Link}
      to={`/${lang}`}
      sx={{
        color: 'inherit',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textDecoration: 'none',
        textTransform: 'uppercase',
      }}
    >
      {t('logo')}
    </Typography>
  );

  const mobileDrawer = (
    <Box role="navigation" sx={{ width: drawerWidth }}>
      <Box sx={{ p: 2, bgcolor: 'navy', color: 'common.white' }}>{logo}</Box>
      <Divider />
      <List sx={{ py: 1 }}>
        {navCategories.map((category) => {
          const expanded = expandedCategory === category.id;
          return (
            <React.Fragment key={category.id}>
              <ListItemButton
                onClick={() =>
                  setExpandedCategory(expanded ? null : category.id)
                }
              >
                <ListItemText
                  primary={category.name}
                  slotProps={{ primary: { fontWeight: 500 } }}
                />
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {category.categories?.map((cat) => (
                    <ListItemButton
                      key={cat.id}
                      sx={{ pl: 4 }}
                      onClick={() => goTo(`topics?t=${cat.slug}`)}
                    >
                      <ListItemText primary={cat.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
        {navCategories.length > 0 && <Divider sx={{ my: 1 }} />}
        {links.map(({ label, link, onClick }) => (
          <ListItemButton
            key={label}
            selected={isActive(link)}
            onClick={() => {
              if (link) {
                goTo(link);
              } else {
                setMobileOpen(false);
                onClick?.();
              }
            }}
          >
            <ListItemText
              primary={label}
              slotProps={{ primary: { fontWeight: 500 } }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'navy',
        color: 'common.white',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label={t('menu', 'Menu')}
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ mr: { md: 2 }, flexGrow: { xs: 1, md: 0 } }}>{logo}</Box>

          <Box
            component="nav"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            {navCategories.map((category) => (
              <RRVDropdown
                key={category.id}
                title={category.name}
                variant="text"
                size="medium"
                buttonProps={{ sx: navButtonSx }}
                options={category.categories?.map((cat) => (
                  <Box
                    key={cat.id}
                    onClick={() => goTo(`topics?t=${cat.slug}`)}
                    // Cover the MenuItem padding so the whole row is clickable.
                    sx={{ mx: -2, my: -0.75, px: 2, py: 0.75, flex: 1 }}
                  >
                    {cat.name}
                  </Box>
                ))}
              />
            ))}
            {links.map(({ label, link, onClick }) => (
              <Button
                key={label}
                variant="text"
                onClick={link ? () => goTo(link) : onClick}
                sx={[navButtonSx, isActive(link) && activeSx]}
              >
                {label}
              </Button>
            ))}
            <Box sx={{ ml: 'auto' }}>
              <RRVSearch value={searchKey} onChange={handleSearch} />
            </Box>
          </Box>

          <IconButton
            color="inherit"
            aria-label={t('search')}
            onClick={() => setOpenSearch(true)}
            sx={{ display: { md: 'none' } }}
          >
            <SearchIcon />
          </IconButton>
          <SelectLanguage />
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { md: 'none' } }}
      >
        {mobileDrawer}
      </Drawer>
      <SearchModal
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
      />
      <ContactModal
        open={openContactForm}
        onClose={() => setOpenContactForm(false)}
      />
    </AppBar>
  );
};
