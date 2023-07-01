import { VERBS } from '../../helpers/http';

export const TopicState = {
  entity: 'Topic',
  actions: {
    add: {
      api: {
        verb: VERBS.post,
        endpoint: '/topics',
      },
    },
    getCs: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: '/topics?page=1&pageSize=4&category=carsoul&truncate=:truncate&canTruncate=yes',
      },
    },
    getRecent: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: '/topics?page=1&pageSize=4&truncate=:truncate&canTruncate=yes',
      },
    },
  },
};
