import { VERBS } from '../../helpers/http';

export const CountState = {
  entity: 'Count',
  actions: {
    getDashboard: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: '/users/dashboard',
      },
    },
  },
};
