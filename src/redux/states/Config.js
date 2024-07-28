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
    getPubs: {
      api: {
        verb: VERBS.get,
        endpoint: '/announcements',
      },
    },
    publish: {
      api: {
        verb: VERBS.post,
        endpoint: 'announcements/:pubId/publish',
        hasBody: true,
      },
    },
  },
};
