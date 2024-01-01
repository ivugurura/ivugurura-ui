import { VERBS } from '../../helpers/http';

export const SystemState = {
  entity: 'System',
  actions: {
    getCounts: {
      api: {
        verb: VERBS.get,
        endpoint: '/users/dashboard',
      },
    },
  },
};
