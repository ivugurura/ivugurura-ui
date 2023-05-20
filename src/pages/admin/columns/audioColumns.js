// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

export const audioColumns = () => [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'type', header: 'Type', size: 1 },
  { accessorKey: 'author', header: 'Author' },
  { accessorKey: 'downloads', header: 'Downloads' },
  { accessorKey: 'shares', header: 'Shares' },
  { accessorKey: 'createdAt', header: 'Date' },
  { accessorKey: 'actions', header: 'Actions' },
];
