import React from 'react';

import { ExpandLess, ExpandMore, Settings as SettingsIcon } from '@mui/icons-material';
import {
  Collapse,
  Grid, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader,
} from '@mui/material';

import { DashboardContainer } from './components/DashboardContainer';

const settingMenus = [{
  name: 'Imibereho myiza', subMenus: [{ name: 'Uburezi' }, { name: 'Umuryango' }],
}, {
  name: 'Ubuhanuzi', subMenus: [{ name: 'Ubuhanuzi bw\'iki gihe' }, { name: 'Ubuhanuzi bw\'ahashize' }],
}];
export const Setting = () => {
  const [currentOpenMenu, setCurrentOpenMenu] = React.useState(null);
  const handleOpenMunu = (menu) => {
    setCurrentOpenMenu((prev) => (prev?.name === menu.name ? null : menu));
  };
  console.log('Commentaries');
  return (
    <DashboardContainer title="Setting menu">
      <Grid container spacing={1}>
        <Grid item xs={12} lg={10}>
          <List subheader={(
            <ListSubheader component="div">
              Nested List Items
            </ListSubheader>
            )}
          >
            {settingMenus.map((menu) => (
              <>
                <ListItemButton onClick={() => handleOpenMunu(menu)}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={<h2>{menu.name}</h2>} />
                  {currentOpenMenu?.name === menu.name ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={currentOpenMenu?.name === menu.name} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.subMenus.map((sMenu) => (
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={<h3>{sMenu.name}</h3>} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} lg={2}>
          <h1>23</h1>
          {' — Commentaries'}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
