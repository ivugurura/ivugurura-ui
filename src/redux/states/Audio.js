import { VERBS } from '../../helpers/http';

import { getPaginationParams } from './utils';

export const AudioState = {
  entity: 'Audio',
  actions: {
    list: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: `/albums/medias/audio?${getPaginationParams(['search'])}`,
      },
    },
  },
};
