import React from 'react';

import { Chip } from '@mui/material';
import moment from 'moment';

export const bookInitials = {
  name: '',
  author: '',
  summary: '',
  categoryId: '',
  isDownloadable: false,
};

export const bookSchema = (onHandleFileInputClick, categories = []) => [
  [{ name: 'name', label: 'Book name' }],
  [
    {
      name: 'categoryId',
      label: 'Book category',
      select: true,
      options: categories,
    },
    { name: 'author', label: 'Book author' },
  ],
  [
    {
      name: 'summary',
      label: 'Book summary',
      multiline: true,
      rows: 4,
    },
  ],
  [
    {
      name: 'isDownloadable',
      label: 'Will the book be downloadable?',
      fieldType: 'switch-field',
      isBool: true,
    },
  ],
  [
    {
      label: 'Cover image',
      fieldType: 'file-field',
      type: 'bookCover',
      accept: '.jpeg, .png',
      placeholder: 'Upload the book cover',
      imgProps: {
        height: 216,
        width: 144,
        bRadius: 5,
        zoom: 0.2,
      },
      onFirstExcute: () => onHandleFileInputClick('bookCover'),
    },
  ],
  [
    {
      label: 'Book file',
      fieldType: 'file-field',
      type: 'bookFile',
      placeholder: 'Add the book file',
      accept: '.pdf',
      onFirstExcute: () => onHandleFileInputClick('bookFile'),
    },
  ],
];

export const bookColumns = (t) => [
  { accessorKey: 'name', header: t('library.tName'), size: 1 },
  {
    id: 'category',
    header: t('library.tCategory'),
    Cell: ({ row }) => row.original.category?.name,
    size: 1,
  },
  {
    id: 'isDownloadable',
    header: t('library.tDownloadable'),
    Cell: ({ row }) => (
      <Chip
        label={t(row.original.isDownloadable ? 'yes' : 'no')}
        color={row.original.isDownloadable ? 'primary' : 'default'}
      />
    ),
    size: 80,
  },
  { accessorKey: 'author', header: t('library.tAuthor'), size: 1 },
  {
    id: 'createdAt',
    header: 'Registed',
    Cell: ({ row }) => moment(row.original.createdAt).format('DD/MM/YYYY'),
    size: 1,
  },
];
