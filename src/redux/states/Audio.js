import { VERBS } from '../../helpers/http';

import { getParams } from './utils';

export const AudioState = {
  entity: 'Audio',
  actions: {
    list: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: `/albums/medias/audio?${getParams(['search'])}`,
      },
    },
    listAll: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: `/albums/medias/all/audio?${getParams()}`,
      },
    },
    create: {
      api: {
        verb: VERBS.post,
        endpoint: '/albums/add',
        hasBody: true,
      },
    },
    share: {
      api: {
        verb: VERBS.get,
        endpoint: '/albums/share/:slug',
        isMutation: true,
      },
    },
  },
};
