import { VERBS } from '../../helpers/http';

import { getParams } from './utils';

export const CategoryState = {
  entity: 'Category',
  actions: {
    list: {
      api: {
        verb: VERBS.get,
        endpoint: `/categories?${getParams(['categoryType'], false)}`,
      },
    },
    create: {
      api: {
        verb: VERBS.post,
        endpoint: '/categories',
        hasBody: true,
      },
    },
  },
};
