// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

import moment from 'moment';

export const dashboardTopicsColumns = () => [
  { accessorKey: 'title', header: 'Topic Title', size: 150 },
  { accessorKey: 'content', header: 'Small description', size: 400 },
  { accessorKey: 'views', header: 'User views', size: 70 },
  {
    id: 'updatedAt',
    header: 'Published',
    Cell: ({ row }) => moment(row.original.updatedAt).format('MMMM Do YYYY'),
    size: 80,
  },
];
