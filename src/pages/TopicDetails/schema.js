export const commentSchema = (t) => [
  [
    {
      name: 'content',
      label: t('fields.commentBody'),
      multiline: true,
      rows: 5,
    },
  ],
  [
    {
      name: 'names',
      label: t('fields.names'),
    },
    {
      name: 'email',
      label: t('fields.email'),
    },
    {
      name: 'website',
      label: t('fields.website'),
    },
  ],
];

export const commentState = {
  content: '',
  names: '',
  email: '',
  website: '',
};
