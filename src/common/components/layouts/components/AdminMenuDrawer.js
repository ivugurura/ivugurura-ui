import * as React from 'react';

import {
  HomeOutlined as HomeIcon,
  AddHomeOutlined as AddHomeIcon,
  PlayLessonOutlined as PlayLessonIcon,
  MusicNoteOutlined as MusicNoteIcon,
  ChatBubbleOutline as ChatBubbleIcon,
  SettingsApplicationsOutlined as SettingIcon,
  PeopleOutline as PeopleIcon,
  LibraryBooksOutlined as LibraryIcon,
} from '@mui/icons-material';
import { Collapse, Divider, List, Toolbar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { systemRoles } from '../../../../helpers/utils/constants';
import { useLang } from '../../providers/LangProvider';
import { SelectLanguage } from '../../SelectLanguage';

import { ListItemLink } from './ListItemLink';

const dashboardMenus = (lang = 'en', role = undefined, t = () => {}) => [
  {
    type: t('admin.nav.webRelated'),
    key: 'webRelated',
    routes: [
      {
        name: t('admin.nav.home'),
        key: 'home',
        to: lang,
        icon: HomeIcon,
      },
      {
        name: 'Library',
        key: 'library',
        to: `${lang}/library`,
        icon: LibraryIcon,
      },
      {
        name: t('admin.topic.title'),
        key: 'add-new-topic',
        to: `${lang}/add-topic`,
        icon: AddHomeIcon,
      },
      {
        name: t('admin.nav.media'),
        key: 'media',
        to: `${lang}/audio`,
        icon: PlayLessonIcon,
        routes: [
          {
            name: t('admin.nav.audio'),
            key: 'audio',
            to: `${lang}/audio`,
            icon: MusicNoteIcon,
          },
        ],
      },
    ],
  },
  {
    type: t('admin.nav.webSettings'),
    key: 'webSettings',
    routes: [
      {
        name: t('admin.nav.commentaries'),
        key: 'commentaries',
        to: `${lang}/commentaries`,
        icon: ChatBubbleIcon,
      },
      ...(role <= systemRoles.admin
        ? [
            {
              name: t('admin.nav.webSettings'),
              key: 'setting',
              to: `${lang}/setting`,
              icon: SettingIcon,
            },
            {
              name: t('admin.nav.systemUsers'),
              key: 'system-users',
              to: `${lang}/users`,
              icon: PeopleIcon,
            },
          ]
        : []),
    ],
  },
  {
    type: t('admin.nav.systemSettings'),
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
  const { t } = useTranslation();
  const [currentlyOpen, setCurrentlyOpen] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  const { lang } = useLang();

  const handleOpen = (key) => {
    setCurrentlyOpen((prev) => (prev === key ? null : key));
  };

  return (
    <div>
      <Toolbar />
      {dashboardMenus(lang, user?.role, t).map((menu) => (
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
                  open={currentlyOpen === menuRoute.key}
                  canExpand={menu.key !== 'settings'}
                  onClick={() => handleOpen(menuRoute.key)}
                />
                {menuRoute.routes?.length > 0 && (
                  <Collapse
                    component="li"
                    in={currentlyOpen === menuRoute.key}
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
