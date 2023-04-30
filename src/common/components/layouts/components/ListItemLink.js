/* eslint-disable no-unused-vars */
import React from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  ListItem, ListItemText, ListItemButton, ListItemIcon,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const ListItemLink = ({
  primary, icon: Icon, open, to, ...otherProps
}) => (
  <ListItem disablePadding component={RouterLink} to={to} {...otherProps}>
    <ListItemButton>
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={primary} />
      {!to && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  </ListItem>
);
