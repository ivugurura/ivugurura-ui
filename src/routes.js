import { Main, Home, TopicView } from './views';

export const routes = [
  {
    component: Main,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/:topicSlug',
        exact: true,
        component: TopicView,
      },
    ],
  },
];
