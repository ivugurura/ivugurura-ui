// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

import { Button } from '@mui/material';

export const navSchema = (navs = [], states = {}) => [
  [
    {
      name: 'name',
      label: 'Category Name',
    },
  ],
  [
    {
      name: 'hasParent',
      label: 'Does it have a parent',
      fieldType: 'switch-field',
      isBool: true,
    },
  ],
  [
    {
      name: 'categoryId',
      label: 'Parent category',
      select: true,
      hide: !states.hasParent,
      options: navs,
    },
  ],
];

export const pubSchema = () => [
  [
    {
      name: 'title',
      label: 'Title',
    },
  ],
  [
    {
      name: 'expiryDate',
      label: 'When the communication is expired',
      fieldType: 'date',
    },
  ],
  [
    {
      name: 'content',
      fieldType: 'text-editor',
      minHeight: '200px',
      label: 'The communication body',
    },
  ],
  [
    {
      name: 'isPublished',
      label: 'Mark it as published',
      fieldType: 'switch-field',
      isBool: true,
    },
  ],
];

export const pubsColumns = (setAction) => [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'content', header: 'Content' },
  {
    id: 'published',
    header: 'Publish',
    Cell: ({ row }) => (row.original.isPublished ? 'Yes' : 'No'),
  },
  {
    id: 'language',
    header: 'Language',
    Cell: ({ row }) => row.original.language?.name,
  },
  {
    id: 'isPublished',
    header: 'Published',
    Cell: ({ row: { original } }) => (
      <Button
        onClick={() => setAction(original)}
        color={original.isPublished ? 'primary' : 'secondary'}
      >
        {original.isPublished ? 'Unpublish' : 'Publish'}
      </Button>
    ),
  },
];
