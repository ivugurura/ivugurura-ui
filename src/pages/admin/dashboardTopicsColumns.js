// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

import { ListItemIcon, MenuItem } from '@mui/material';
import moment from 'moment';

export const dashboardTopicsColumns = () => [
  { accessorKey: 'title', header: 'Topic Title', size: 150 },
  { accessorKey: 'content', header: 'Small description', size: 400 },
  { accessorKey: 'views', header: 'User views', size: 70 },
  {
    accessorKey: 'createdAt',
    header: 'Published',
    Cell: ({ row }) => moment(row.updatedAt).format('MMMM Do YYYY'),
    size: 80,
  },
];

export const renderRowActionMenuItems = (setAction, menus = []) => (params) => menus.map((menu) => {
  const { title, icon: Icon, action } = menu;
  return (
    <MenuItem
      key={action}
      onClick={() => setAction(action, params)}
      sx={{ m: 0 }}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      {typeof title === 'string' ? title : title(params.row.original?.entities?.length)}
    </MenuItem>
  );
});
