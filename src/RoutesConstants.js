const common = { Audios: 'audios', Library: 'library' };

export const PageRoutes = {
  Topics: 'topics',
  Topic: 'topics/:slug',
  Login: 'login',
  ...common,
  admin: {
    AddTopic: 'add-topic',
    EditTopic: 'edit-topic/:topicSlug',
    Commentaries: 'commentaries',
    Setting: 'setting',
    Users: 'users',
    ...common,
  },
};
