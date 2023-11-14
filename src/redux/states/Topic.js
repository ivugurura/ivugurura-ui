import { VERBS } from '../../helpers/http';

import { getParams } from './utils';

export const TopicState = {
  entity: 'Topic',
  actions: {
    create: {
      api: {
        verb: VERBS.post,
        endpoint: '/topics',
        hasBody: true,
      },
    },
    view: {
      api: {
        verb: VERBS.get,
        endpoint: '/topics/:slug',
      },
    },
    list: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: `/topics?${getParams(['category', 'truncate'])}&canTruncate=yes`,
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
    getOverview: {
      api: {
        verb: VERBS.get,
        endpoint: `/users/topics?canTruncate=yes&${getParams(['truncate', 'search'])}`,
      },
    },
  },
};
