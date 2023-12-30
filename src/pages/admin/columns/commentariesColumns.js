// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

import { Button, Tooltip, Typography } from '@mui/material';

export const commentariesColumns = (setAction) => [
  { accessorKey: 'commentor', header: 'Commentor Info', size: 1 },
  {
    id: 'commentor',
    header: 'Commentor Info',
    Cell: ({ row }) => (
      <Tooltip
        title={(
          <>
            <Typography color="inherit">Tooltip with HTML</Typography>
            <em>And here is</em>
            {' '}
            <b>some</b>
            {' '}
            <u>amazing content</u>
            .
            {' '}
            It is very engaging. Right?
          </>
        )}
      >
        <Button>HTML</Button>
      </Tooltip>
    ),
    size: 80,
  },
  { accessorKey: 'content', header: 'Content' },
  { accessorKey: 'topicTitle', header: 'Topic Title' },
  {
    id: 'isPublished',
    header: 'Published',
    Cell: ({ row }) => <Button onClick={() => setAction(row.original)}>Publish</Button>,
    size: 80,
  },
  { accessorKey: 'actions', header: 'Actions' },
];
