// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

import { Button, Tooltip, Typography } from '@mui/material';

export const commentariesColumns = (setAction) => [
  {
    id: 'commentor',
    header: 'Commentor Info',
    Cell: ({ row }) => (
      <Tooltip
        title={(
          <>
            <Typography color="inherit">{row.original.names}</Typography>
            <b>E-mail:</b>
            <u>{row.original.email}</u>
            .
            <br />
            <b>Website:</b>
            <u>{row.original.website}</u>
          </>
        )}
      >
        <>
          <Typography color="inherit">{row.original.names}</Typography>
          {row.original.email}
        </>
      </Tooltip>
    ),
    size: 80,
  },
  { accessorKey: 'content', header: 'Content' },
  {
    id: 'title',
    header: 'Topic Title',
    Cell: ({ row }) => row.original.topic?.title,
    size: 80,
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
    size: 80,
  },
];
