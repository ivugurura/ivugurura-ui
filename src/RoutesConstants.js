const common = {
  Audios: 'audios',
  Library: 'library',
  Ask: 'ask',
  ViewBook: 'library/:slug',
};

export const PageRoutes = {
  Announcement: 'announcement',
  PrivacyPolicy: 'privacy-policy',
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
