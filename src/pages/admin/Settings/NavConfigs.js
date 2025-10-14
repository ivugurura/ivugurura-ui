import React, { useState } from 'react';

import {
  ExpandLess,
  ExpandMore,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import {
  Button,
  Collapse,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { actions, initials } from '../../../redux/apiSliceBuilder';

import { AddEditNav } from './AddEditNav';

export const NavConfigs = () => {
  const [open, setOpen] = useState(false);
  const { data, refetch } = actions.useGetNavsConfigQuery();

  const [currentOpenMenu, setCurrentOpenMenu] = React.useState(null);
  const handleOpenMunu = (menu) => {
    setCurrentOpenMenu((prev) => (prev?.slug === menu.slug ? null : menu));
  };
  const { data: navs } = data || initials.dataArr;
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader
        title="Setting"
        action={
          <Button onClick={() => setOpen(true)}>
            {t('admin.WebSettings.add')}
          </Button>
        }
      />
      <CardContent sx={{ height: '100vh' }}>
        <AddEditNav
          open={open}
          onClose={() => setOpen(false)}
          navs={navs}
          refetchNavs={refetch}
        />
        <List>
          {navs.map((nav) => (
            <div key={nav.slug}>
              <ListItemButton onClick={() => handleOpenMunu(nav)}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={<h3>{nav.name}</h3>} />
                {currentOpenMenu?.slug === nav.slug ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              <Collapse
                in={currentOpenMenu?.slug === nav.slug}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {nav.categories.map((subCat) => (
                    <ListItemButton sx={{ pl: 4 }} key={subCat.slug}>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<h4>{subCat.name}</h4>} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
