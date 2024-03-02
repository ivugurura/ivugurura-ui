import React from 'react';

import { ListItemIcon, MenuItem } from '@mui/material';

export * from './Table';

export const renderRowActionMenus =
  (setAction, menus = []) =>
  (params) =>
    menus.map((menu) => {
      const { title, icon: Icon, action, canDisable } = menu;
      return (
        <MenuItem
          key={action}
          onClick={() => setAction(action, params)}
          disabled={canDisable?.(params.row.original) || false}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          {typeof title === 'string' ? title : title(params.row.original)}
        </MenuItem>
      );
    });
