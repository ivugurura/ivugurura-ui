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
    getPub: {
      api: {
        verb: VERBS.get,
        endpoint: 'announcements/published?truncate=:truncate',
      },
    },
    createPub: {
      api: {
        verb: VERBS.post,
        endpoint: 'announcements',
        hasBody: true,
      },
    },
    publishPub: {
      api: {
        verb: VERBS.patch,
        endpoint: 'announcements/:pubId/publish',
        hasBody: true,
      },
    },
  },
};
