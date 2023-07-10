import { VERBS } from '../../helpers/http';

import { getParams } from './utils';

export const TopicState = {
  entity: 'Topic',
  actions: {
    add: {
      api: {
        verb: VERBS.post,
        endpoint: '/topics',
      },
    },
    view: {
      api: {
        verb: VERBS.get,
        endpoint: '/topics/:slug',
      },
    },
    list: {
      api: {
        verb: VERBS.get,
        endpoint: `/topics?${getParams(['page', 'pageSize', 'category'])}`,
      },
    },
    getCs: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: `/topics?page=1&pageSize=4&category=carsoul&canTruncate=yes${getParams(['truncate'], false)}`,
      },
    },
    getRecent: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: `/topics?page=1&pageSize=4&canTruncate=yes${getParams(['truncate'], false)}`,
      },
    },
  },
};
