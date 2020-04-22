import { Main, Home, TopicView, Dashboard } from './views';

export const routes = [
  {
    path: '/admin',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/',
    component: Main,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/:topicSlug/view',
        exact: true,
        component: TopicView,
      },
    ],
  },
];
