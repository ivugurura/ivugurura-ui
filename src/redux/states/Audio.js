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
  },
};