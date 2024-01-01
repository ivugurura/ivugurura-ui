export const mediaSchema = (albums = []) => [
  [
    {
      label: 'Media title',
      name: 'title',
    },
  ],
  [
    {
      label: 'Media type',
      name: 'type',
      select: true,
      options: [{ id: 'audio', name: 'Audio' }],
    },
    {
      label: 'Media album',
      name: 'albumId',
      select: true,
      options: albums,
    },
  ],
  [
    {
      label: 'Author',
      name: 'author',
    },
    {
      label: 'Action date',
      name: 'actionDate',
      type: 'date',
    },
  ],
  [
    {
      label: 'Media file',
      fieldType: 'file-field',
      type: 'song',
      accept: '.mp3, .m4a',
    },
  ],
];

export const audioColumns = () => [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'type', header: 'Type', size: 1 },
  { accessorKey: 'author', header: 'Author' },
  { accessorKey: 'downloads', header: 'Downloads' },
  { accessorKey: 'shares', header: 'Shares' },
  { accessorKey: 'createdAt', header: 'Date' },
  { accessorKey: 'actions', header: 'Actions' },
];
