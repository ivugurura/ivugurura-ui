import {
  Main,
  Home,
  TopicView,
  Dashboard,
  AdminMain,
  AddEditTopic,
} from './views';

export const routes = [
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
      {
        path: '/admin',
        exact: true,
        component: Dashboard,
      },
      {
        path: '/admin/add-topic',
        exact: true,
        component: AddEditTopic,
      },
    ],
  },
];
