// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';

export const commentariesColumns = () => [
  { accessorKey: 'no', header: 'No' },
  { accessorKey: 'commentor', header: 'Commentor Info', size: 1 },
  { accessorKey: 'content', header: 'Content' },
  { accessorKey: 'topicTitle', header: 'Topic Title' },
  { accessorKey: 'isPublished', header: 'Is published' },
  { accessorKey: 'actions', header: 'Actions' },
];
