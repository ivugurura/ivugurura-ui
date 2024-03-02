export const loginSchema = () => [
  [
    {
      name: 'email',
      label: 'Email address',
      size: 'medium',
      autoComplete: 'email',
      autoFocus: true,
    },
  ],
  [
    {
      name: 'password',
      fieldType: 'password',
      label: 'Password',
      autoComplete: 'current-password',
      size: 'medium',
    },
  ],
];
