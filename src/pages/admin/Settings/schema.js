// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const navSchema = (navs = [], states = {}) => {
  const { t } = useTranslation();

  return [
    [
      {
        name: 'name',
        label: t('admin.WebContent.category'),
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
};

export const pubSchema = () => {
  const { t } = useTranslation();
  return [
    [
      {
        name: 'title',
        label: t('admin.WebSettings.tTitle'),
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
        name: t('admin.WebSettings.content'),
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
};

export const pubsColumns = (setAction) => {
  const { t } = useTranslation();

  return [
    { accessorKey: 'title', header: t('admin.WebSettings.tTitle') },
    { accessorKey: 'content', header: t('admin.WebSettings.tContent') },
    {
      id: 'published',
      header: t('actions.publish'),
      Cell: ({ row }) =>
        row.original.isPublished
          ? t('admin.WebSettings.yes')
          : t('admin.WebSettings.no'),
    },
    {
      id: 'language',
      header: t('admin.WebSettings.tLanguage'),
      Cell: ({ row }) => row.original.language?.name,
    },
    {
      id: 'isPublished',
      header: t('admin.home.published'),
      Cell: ({ row: { original } }) => (
        <Button
          onClick={() => setAction(original)}
          color={original.isPublished ? 'primary' : 'secondary'}
        >
          {original.isPublished
            ? t('admin.home.unpublished')
            : t('admin.home.published')}
        </Button>
      ),
    },
  ];
};
