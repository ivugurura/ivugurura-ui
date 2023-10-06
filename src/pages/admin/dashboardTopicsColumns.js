// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

import { DeleteOutlineOutlined, EditNoteOutlined, PublishOutlined } from '@mui/icons-material';
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

export const renderRowActionMenuItems = ({ closeMenu }) => [
  <MenuItem
    key={0}
    onClick={() => {
      // View profile logic...
      closeMenu();
    }}
    sx={{ m: 0 }}
  >
    <ListItemIcon>
      <DeleteOutlineOutlined />
    </ListItemIcon>
    Remove from home
  </MenuItem>,
  <MenuItem
    key={1}
    onClick={() => {
      // Send email logic...
      closeMenu();
    }}
    sx={{ m: 0 }}
  >
    <ListItemIcon>
      <PublishOutlined />
    </ListItemIcon>
    Unpublish
  </MenuItem>,
  <MenuItem
    key={2}
    onClick={() => {
      // Send email logic...
      closeMenu();
    }}
    sx={{ m: 0 }}
  >
    <ListItemIcon>
      <EditNoteOutlined />
    </ListItemIcon>
    Edit
  </MenuItem>,
];
