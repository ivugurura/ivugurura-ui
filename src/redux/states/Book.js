import { VERBS } from '../../helpers/http';

import { getParams } from './utils';

export const BookState = {
  entity: 'Book',
  actions: {
    list: {
      api: {
        verb: VERBS.get,
        endpoint: `/books?${getParams()}`,
      },
    },
    listCategories: {
      api: {
        verb: VERBS.get,
        endpoint: '/books/categories',
      },
    },
    create: {
      api: {
        verb: VERBS.post,
        endpoint: '/books',
        hasBody: true,
      },
    },
  },
};
