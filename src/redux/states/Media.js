import { VERBS } from '../../helpers/http';

export const MediaState = {
  entity: 'Media',
  actions: {
    getImages: {
      api: {
        verb: VERBS.get,
        endpoint: '/albums/images/cover-images',
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
  },
};
