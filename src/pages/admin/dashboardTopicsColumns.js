// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

export const dashboardTopicsColumns = () => [
  { accessorKey: 'title', header: 'Topic Title' },
  { accessorKey: 'content', header: 'Small description' },
  { accessorKey: 'views', header: 'Views' },
  { accessorKey: 'createdAt', header: 'Created at' },
];
