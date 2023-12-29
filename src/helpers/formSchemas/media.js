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
      options: [{ value: 'audio', label: 'Audio' }],
    },
    {
      label: 'Media album',
      name: 'albumId',
      select: true,
      options: albums,
      valueSelector: 'id',
      labelSelector: 'name',
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
