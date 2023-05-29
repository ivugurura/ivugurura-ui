// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

export const userColumns = () => [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'names', header: 'Commentor Info', size: 1 },
  { accessorKey: 'username', header: 'Content' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'topicTitle', header: 'Topic Title' },
  { accessorKey: 'role', header: 'Is published' },
  { accessorKey: 'createdAt', header: 'Is published' },
  { accessorKey: 'actions', header: 'Actions' },
];
