import { Fade, Menu, MenuItem } from '@mui/material';

export const RRVMenu = ({
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
