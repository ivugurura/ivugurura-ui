// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

export const userColumns = () => [
  { accessorKey: 'names', header: 'Names(First/Last name)', size: 1 },
  { accessorKey: 'username', header: 'User name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'User role' },
  { accessorKey: 'createdAt', header: 'Registed' },
  { accessorKey: 'actions', header: 'Actions' },
];
