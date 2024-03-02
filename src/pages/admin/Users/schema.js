// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

import moment from 'moment';

import { getRole } from '../../../helpers/utils/constants';

export const userColumns = () => [
  { accessorKey: 'names', header: 'Names(First/Last name)' },
  { accessorKey: 'username', header: 'User name', size: 1 },
  { accessorKey: 'email', header: 'Email' },
  {
    id: 'role',
    header: 'User role',
    Cell: ({ row }) => getRole(row.original.role),
    size: 1,
  },
  {
    id: 'createdAt',
    header: 'Registed',
    Cell: ({ row }) => moment(row.original.createdAt).format('DD/MM/YYYY'),
    size: 1,
  },
];

export const userInitials = {
  email: '',
  isActive: false,
  names: '',
  password: '',
  role: 3,
  username: '',
};

export const userEditLebels = {
  password: 'Change the password',
};

export const userSchema = (newLevel = {}) => [
  [{ name: 'names', label: 'User full name (First and last name)' }],
  [
    {
      name: 'isActive',
      label: 'Is active?',
      fieldType: 'switch-field',
      isBool: true,
    },
  ],
  [
    { name: 'username', label: 'User name (with no space)' },
    { name: 'email', label: 'Email', type: 'email' },
  ],
  [
    {
      name: 'role',
      label: 'User role',
      select: true,
      options: [
        { id: 2, name: 'Admin' },
        { id: 3, name: 'Editor' },
      ],
    },
    { name: 'password', label: newLevel?.password || 'Set user password' },
  ],
];
