import React from 'react';

import {
  Fade,
  Menu,
  MenuItem,
  type PopoverVirtualElement,
} from '@mui/material';

interface MenuOption {
  id: string;
  name: React.ReactNode;
  onClick?: () => void;
}

interface RRVMenuProps {
  menus: MenuOption[];
  open: boolean;
  anchorEl?:
    | Element
    | PopoverVirtualElement
    | (() => Element)
    | (() => PopoverVirtualElement)
    | null;
  handleClose: (
    event: React.SyntheticEvent,
    reason: 'backdropClick' | 'escapeKeyDown',
  ) => void;
  lebelledBy?: string;
  menuId?: string;
}

export const RRVMenu: React.FC<RRVMenuProps> = ({
  menus = [],
  open,
  anchorEl = null,
  handleClose,
  lebelledBy,
  menuId,
}) => (
  <Menu
    id={menuId}
    MenuListProps={{
      'aria-labelledby': lebelledBy,
    }}
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    TransitionComponent={Fade}
  >
    {menus.map((menu) => (
      <MenuItem
        key={menu.id}
        onClick={(e) => {
          handleClose(e);
          menu?.onClick?.();
        }}
      >
        {menu.name}
      </MenuItem>
    ))}
  </Menu>
);
