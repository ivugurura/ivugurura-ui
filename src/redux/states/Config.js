import { VERBS } from '../../helpers/http';

export const ConfigState = {
  entity: 'Config',
  actions: {
    getNavs: {
      api: {
        verb: VERBS.get,
        endpoint: '/categories/navs',
      },
    },
  },
};
