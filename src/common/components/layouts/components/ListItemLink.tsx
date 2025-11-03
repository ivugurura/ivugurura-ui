/* eslint-disable no-unused-vars */
import React from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface ListItemLinkProps extends Omit<RouterLinkProps, 'to'> {
  primary: React.ReactNode;
  icon?: React.ElementType;
  open?: boolean;
  to?: string;
  canExpand?: boolean;
}

export const ListItemLink: React.FC<ListItemLinkProps> = ({
  primary,
  icon: Icon,
  open,
  to,
  canExpand,
  ...otherProps
}) => (
  <ListItem disablePadding component={RouterLink} to={to} {...otherProps}>
    <ListItemButton>
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={primary} />
      {!to && canExpand && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  </ListItem>
);
