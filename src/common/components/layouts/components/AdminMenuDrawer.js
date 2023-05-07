import * as React from 'react';

import {
  HomeOutlined as HomeIcon,
  AddHomeOutlined as AddHomeIcon,
  PlayLessonOutlined as PlayLessonIcon,
  MusicNoteOutlined as MusicNoteIcon,
  ChatBubbleOutline as ChatBubbleIcon,
  SettingsApplicationsOutlined as SettingIcon,
  PeopleOutline as PeopleIcon,
} from '@mui/icons-material';
import {
  Collapse,
  Divider,
  List,
  Toolbar,
  Typography,
} from '@mui/material';

import { ListItemLink } from './ListItemLink';

const dashboardMenus = (lang = 'kn') => [{
  type: 'Main',
  routes: [{
    name: 'Home',
    to: lang,
    icon: HomeIcon,
  }, {
    name: 'Add new topic',
    to: `${lang}/add-topic`,
    icon: AddHomeIcon,
  }, {
    name: 'Media',
    to: `${lang}/audio`,
    icon: PlayLessonIcon,
    routes: [{
      name: 'Audio',
      to: `${lang}/audio`,
      icon: MusicNoteIcon,
    }],
  }],
}, {
  type: 'Extra',
  routes: [{
    name: 'Commentaries',
    to: `${lang}/commentaries`,
    icon: ChatBubbleIcon,
  }, {
    name: 'Setting',
    to: `${lang}/setting`,
    icon: SettingIcon,
  }, {
    name: 'System users',
    to: `${lang}/users`,
    icon: PeopleIcon,
  }],
}];
export const AdminMenuDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  return (
    <div>
      <Toolbar />
      {dashboardMenus().map((menu) => (
        <React.Fragment key={menu.type}>
          <Divider />
          <Typography variant="body1" mt={1}>{menu.type}</Typography>
          <List>
            {menu.routes.map((menuRoute) => (
              <React.Fragment key={menuRoute.name}>
                <ListItemLink
                  key={menuRoute.name}
                  primary={menuRoute.name}
                  icon={menuRoute.icon}
                  to={menuRoute.routes?.length > 0 ? undefined : menuRoute.to}
                  open={open}
                  onClick={handleOpen}
                />
                {menuRoute.routes?.length > 0 && (
                <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {menuRoute.routes.map((menuRoute2) => (
                      <ListItemLink
                        key={menuRoute2.name}
                        primary={menuRoute2.name}
                        to={menuRoute2.to}
                        icon={menuRoute.icon}
                        sx={{ pl: 4 }}
                      />
                    ))}
                  </List>
                </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </React.Fragment>
      ))}
    </div>
  );
};
