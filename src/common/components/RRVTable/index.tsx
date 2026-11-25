import React from 'react';

import { ListItemIcon, MenuItem, type SvgIconProps } from '@mui/material';
import type { MRT_Row, MRT_RowData } from 'material-react-table';

export * from './Table';

export interface RowActionMenu<TData extends MRT_RowData> {
  title: string | ((row: TData) => string);
  icon: React.ComponentType<SvgIconProps>;
  action: string;
  canDisable?: (row: TData) => boolean;
}

/** What material-react-table passes to `renderRowActionMenuItems`. */
export interface RowActionParams<TData extends MRT_RowData> {
  row: MRT_Row<TData>;
  closeMenu: () => void;
}

export const renderRowActionMenus =
  <TData extends MRT_RowData>(
    setAction: (action: string, params: RowActionParams<TData>) => void,
    menus: RowActionMenu<TData>[] = [],
  ) =>
  (params: RowActionParams<TData>) =>
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
