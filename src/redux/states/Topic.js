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
    update: {
      api: {
        verb: VERBS.patch,
        endpoint: '/topics/:slug',
        hasBody: true,
      },
    },
    view: {
      api: {
        verb: VERBS.get,
        endpoint: '/topics/:slug',
      },
    },
    viewComments: {
      api: {
        verb: VERBS.get,
        endpoint: '/topics/:slug/comments',
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
    setHome: {
      api: {
        verb: VERBS.patch,
        endpoint: '/manage/entity-display/:topicId',
        hasBody: true,
      },
    },
    getComments: {
      api: {
        verb: VERBS.get,
        endpoint: `/topics/comments/all?${getParams([])}`,
      },
    },
    publish: {
      api: {
        verb: VERBS.put,
        endpoint: '/topics/publish/comments/:commentId',
        hasBody: true,
      },
    },
    addComment: {
      api: {
        verb: VERBS.post,
        endpoint: '/topics/:slug/comments',
        hasBody: true,
      },
    },
    deleteComments: {
      api: {
        verb: VERBS.delete,
        endpoint: '/topics/comments',
        hasBody: true,
      },
    },
  },
};
