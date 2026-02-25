import { VERBS } from '../../helpers/http';

export const MediaState: APP.IState = {
  entity: 'Media',
  actions: {
    getResources: {
      api: {
        verb: VERBS.get,
        endpoint: '/albums/resources/:resourceType',
      },
    },
    createAlbum: {
      api: {
        verb: VERBS.post,
        endpoint: '/albums',
        hasBody: true,
      },
    },
    getAlbums: {
      api: {
        verb: VERBS.get,
        endpoint: '/albums',
      },
    },
    syncAssets: {
      api: {
        verb: VERBS.post,
        endpoint: '/albums/sync',
        hasBody: true,
      },
    },
  },
};
