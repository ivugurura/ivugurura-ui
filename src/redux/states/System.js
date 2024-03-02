import { VERBS } from '../../helpers/http';

import { getParams } from './utils';

export const SystemState = {
  entity: 'System',
  actions: {
    getCounts: {
      api: {
        verb: VERBS.get,
        endpoint: '/users/dashboard',
      },
    },
    createUser: {
      api: {
        verb: VERBS.post,
        endpoint: '/users',
        hasBody: true,
      },
    },
    updateUser: {
      api: {
        verb: VERBS.patch,
        endpoint: '/users/:userId',
        hasBody: true,
      },
    },
    listUsers: {
      api: {
        verb: VERBS.get,
        endpoint: `/users?${getParams([])}`,
      },
    },
    login: {
      api: {
        verb: VERBS.post,
        endpoint: '/users/login',
        hasBody: true,
      },
    },
  },
};
