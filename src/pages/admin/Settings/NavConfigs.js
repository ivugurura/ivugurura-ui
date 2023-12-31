import React from 'react';

import { ExpandLess, ExpandMore, Settings as SettingsIcon } from '@mui/icons-material';
import {
  Button, Collapse, Card, CardHeader, CardContent,
  List, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';

const settingMenus = [{
  name: 'Imibereho myiza', subMenus: [{ name: 'Uburezi' }, { name: 'Umuryango' }],
}, {
  name: 'Ubuhanuzi', subMenus: [{ name: 'Ubuhanuzi bw\'iki gihe' }, { name: 'Ubuhanuzi bw\'ahashize' }],
}];
export const NavConfigs = () => {
  const [currentOpenMenu, setCurrentOpenMenu] = React.useState(null);
  const handleOpenMunu = (menu) => {
    setCurrentOpenMenu((prev) => (prev?.name === menu.name ? null : menu));
  };
  return (
    <Card>
      <CardHeader title="Setting" action={<Button>Add</Button>} />
      <CardContent sx={{ height: '100vh' }}>
        <List>
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
      </CardContent>
    </Card>
  );
};
