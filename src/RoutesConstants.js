const common = { Library: 'library' };

export const PageRoutes = {
  Audios: 'audios',
  Topics: 'topics',
  Topic: 'topics/:slug',
  Login: 'login',
  ...common,
  admin: {
    AddTopic: 'add-topic',
    EditTopic: 'edit-topic/:topicSlug',
    Audio: 'audio',
    Commentaries: 'commentaries',
    Setting: 'setting',
    Users: 'users',
    ...common,
  },
};
