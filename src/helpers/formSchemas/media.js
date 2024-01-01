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
