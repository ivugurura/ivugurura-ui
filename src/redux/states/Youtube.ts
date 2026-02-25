import { VERBS } from '../../helpers/http';

export const YoutubeState: APP.IState = {
  entity: 'Youtube',
  actions: {
    list: {
      suffix: 's',
      api: {
        verb: VERBS.get,
        endpoint: '/youtube',
      },
    },
  },
};
