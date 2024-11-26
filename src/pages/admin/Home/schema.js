// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

import { Chip } from '@mui/material';
import moment from 'moment';

export const dashboardTopicsColumns = (t) => [
  { accessorKey: 'title', header: t('admin.home.tTitle'), size: 150 },
  { accessorKey: 'content', header: t('admin.home.tDescription'), size: 400 },
  { accessorKey: 'views', header: t('admin.home.tViews'), size: 70 },
  {
    id: 'updatedAt',
    header: t('admin.home.tPublished'),
    Cell: ({ row }) => moment(row.original.updatedAt).format('DD.MM.YYYY'),
    size: 80,
  },
  {
    id: 'status',
    header: t('admin.home.tStatus'),
    Cell: ({ row }) => (
      <Chip
        label={t(`admin.home.${row.original.isPublished ? '' : 'un'}published`)}
        color={row.original.isPublished ? 'primary' : 'default'}
      />
    ),
    size: 80,
  },
];
