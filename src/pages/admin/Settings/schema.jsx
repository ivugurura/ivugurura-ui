import React from 'react';

import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const navSchema = (navs = [], states = {}) => {
  return [
    [
      {
        name: 'name',
        label: 'Name',
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
        label: t('admin.webSettings.tTitle'),
      },
    ],
    [
      {
        name: 'expiryDate',
        label: t('admin.webSettings.fExpiry'),
        fieldType: 'date',
      },
    ],
    [
      {
        name: t('admin.webSettings.content'),
        fieldType: 'text-editor',
        minHeight: '200px',
        label: 'The communication body',
      },
    ],
    [
      {
        name: 'isPublished',
        label: t('admin.webSettings.fPublished'),
        fieldType: 'switch-field',
        isBool: true,
      },
    ],
  ];
};

export const pubsColumns = (setAction) => {
  const { t } = useTranslation();

  return [
    { accessorKey: 'title', header: t('admin.webSettings.tTitle') },
    { accessorKey: 'content', header: t('admin.webSettings.tContent') },
    {
      id: 'published',
      header: t('actions.publish'),
      Cell: ({ row }) => (row.original.isPublished ? t('yes') : t('no')),
    },
    {
      id: 'language',
      header: t('admin.webSettings.tLanguage'),
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
          {t(`admin.home.${original.isPublished ? 'unpublish' : 'publish'}`)}
        </Button>
      ),
    },
  ];
};
