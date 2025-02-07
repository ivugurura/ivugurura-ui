export const formInitials = {
  names: '',
  email: '',
  message: '',
};

export const contactSchema = (t) => [
  [
    { name: 'names', label: t('fields.names') },
    { name: 'email', label: t('fields.email'), type: 'email' },
  ],
  [
    {
      name: 'message',
      label: t('fields.message'),
      multiline: true,
      rows: 4,
    },
  ],
];
