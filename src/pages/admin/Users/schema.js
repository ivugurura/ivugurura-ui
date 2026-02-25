import moment from 'moment';

import { getRole } from '../../../helpers/utils/constants';

export const userColumns = (t) => {
  return [
    { accessorKey: 'names', header: t('admin.users.tName') },
    { accessorKey: 'username', header: t('admin.users.tUsername'), size: 1 },
    { accessorKey: 'email', header: 'Email' },
    {
      id: 'role',
      header: t('admin.users.tRole'),
      Cell: ({ row }) => getRole(row.original.role),
      size: 1,
    },
    {
      id: 'createdAt',
      header: t('admin.users.tRegistered'),
      Cell: ({ row }) => moment(row.original.createdAt).format('DD/MM/YYYY'),
      size: 1,
    },
  ];
};

export const userInitials = {
  email: '',
  isActive: false,
  names: '',
  password: '',
  role: 3,
  username: '',
};

export const userEditLebels = {
  password: 'Change the password',
};

export const userSchema = (newLevel = {}, t) => [
  [{ name: 'names', label: t('admin.users.fNames') }],
  [
    {
      name: 'isActive',
      label: t('admin.users.fActive'),
      fieldType: 'switch-field',
      isBool: true,
    },
  ],
  [
    { name: 'username', label: t('admin.users.fUserName') },
    { name: 'email', label: t('admin.users.fEmail'), type: 'email' },
  ],
  [
    {
      name: 'role',
      label: t('admin.users.fRole'),
      select: true,
      options: [
        {
          id: 2,
          name: t('admin.users.fAdmin'),
        },
        {
          id: 3,
          name: t('admin.users.fEditor'),
        },
      ],
    },
    {
      name: 'password',
      label: newLevel?.password || t('admin.users.fPassword'),
    },
  ],
];
