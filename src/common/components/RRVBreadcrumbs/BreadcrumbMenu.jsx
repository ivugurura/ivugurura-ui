import { Menu, MenuItem } from '@mui/material';

export const BreadcrumbMenu = ({
  menus = [],
  open,
  anchorEl = null,
  handleClose,
  lebelledBy,
  menuId,
}) => (
  <Menu
    id={menuId}
    aria-labelledby={lebelledBy}
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
  >
    {menus.map((menu) => (
      <MenuItem
        key={menu.title}
        onClick={(e) => {
          handleClose(e);
          menu.onClick();
        }}
      >
        {menu.title}
      </MenuItem>
    ))}
  </Menu>
);
