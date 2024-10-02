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
import { Collapse, Divider, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { systemRoles } from '../../../../helpers/utils/constants';
import { useLang } from '../../providers/LangProvider';
import { SelectLanguage } from '../../SelectLanguage';

import { ListItemLink } from './ListItemLink';

const dashboardMenus = (lang = 'en', role = undefined) => [
  {
    type: 'Site related',
    routes: [
      {
        name: 'Home',
        key: 'home',
        to: lang,
        icon: HomeIcon,
      },
      {
        name: 'Add new topic',
        key: 'add-new-topic',
        to: `${lang}/add-topic`,
        icon: AddHomeIcon,
      },
      {
        name: 'Media',
        key: 'media',
        to: `${lang}/audio`,
        icon: PlayLessonIcon,
        routes: [
          {
            name: 'Audio',
            key: 'audio',
            to: `${lang}/audio`,
            icon: MusicNoteIcon,
          },
        ],
      },
    ],
  },
  {
    type: 'Extra',
    key: 'extra',
    routes: [
      {
        name: 'Commentaries',
        key: 'commentaries',
        to: `${lang}/commentaries`,
        icon: ChatBubbleIcon,
      },
      ...(role <= systemRoles.admin
        ? [
            {
              name: 'Setting',
              key: 'setting',
              to: `${lang}/setting`,
              icon: SettingIcon,
            },
            {
              name: 'System users',
              key: 'system-users',
              to: `${lang}/users`,
              icon: PeopleIcon,
            },
          ]
        : []),
    ],
  },
  {
    type: 'Settings',
    key: 'settings',
    routes: [
      {
        name: <SelectLanguage color="#16222a" home="admin" />,
        key: 'select-lang',
        icon: SettingIcon,
      },
    ],
  },
];
export const AdminMenuDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const { lang } = useLang();
  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  return (
    <div>
      <Toolbar />
      {dashboardMenus(lang, user?.role).map((menu) => (
        <React.Fragment key={menu.key}>
          <Divider />
          <Typography variant="body1" mt={1}>
            {menu.type}
          </Typography>
          <List>
            {menu.routes.map((menuRoute) => (
              <React.Fragment key={menuRoute.key}>
                <ListItemLink
                  primary={menuRoute.name}
                  icon={menuRoute.icon}
                  to={menuRoute.routes?.length > 0 ? undefined : menuRoute.to}
                  open={open}
                  canExpand
                  onClick={handleOpen}
                />
                {menuRoute.routes?.length > 0 && (
                  <Collapse
                    component="li"
                    in={open}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List disablePadding>
                      {menuRoute.routes.map((menuRoute2) => (
                        <ListItemLink
                          key={menuRoute2.key}
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
