// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

import { Button, ButtonGroup, Tooltip, Typography } from '@mui/material';

export const commentariesColumns = (setAction, t) => [
  {
    id: 'commentor',
    header: t('admin.commentaries.tCommentorInfo'),
    Cell: ({ row }) => (
      <Tooltip
        title={
          <>
            <Typography color="inherit">{row.original.names}</Typography>
            <b>E-mail:</b>
            <u>{row.original.email}</u>
            .
            <br />
            <b>Website:</b>
            <u>{row.original.website}</u>
          </>
        }
      >
        <>
          <Typography color="inherit">{row.original.names}</Typography>
          {row.original.email}
        </>
      </Tooltip>
    ),
    size: 80,
  },
  { accessorKey: 'content', header: t('admin.commentaries.tContent'), },
  {
    id: 'title',
    header: t('admin.commentaries.tTopicTitle'),
    Cell: ({ row }) => row.original.topic?.title,
    size: 80,
  },
  {
    id: 'isPublished',
    header: t('admin.commentaries.tPublished'),
    Cell: ({ row: { original } }) => (
      <ButtonGroup size="small">
        <Button
          onClick={() => setAction(original, 'publish')}
          color={original.isPublished ? 'primary' : 'secondary'}
        >
          {original.isPublished ? 'Unpublish' : 'Publish'}
        </Button>
        <Button onClick={() => setAction(original, 'reply')}>
          {original.privateReply ? 'Replied' : 'Reply'}
        </Button>
      </ButtonGroup>
    ),
    size: 80,
  },
];
