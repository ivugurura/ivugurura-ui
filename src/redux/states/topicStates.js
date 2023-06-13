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
    list: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: '/topics?page=:page&pageSize=:pageSize&category=:category',
      },
    },
  },
};
