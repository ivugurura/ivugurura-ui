import {
  Main,
  Home,
  TopicView,
  Dashboard,
  AdminMain,
  AddEditTopic,
  Login,
} from './views';

export const routes = [
  {
    path: '/admin',
    component: AdminMain,
    routes: [
      {
        path: '/admin/login',
        exact: true,
        component: Login,
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
      AdminMain,
    ],
  },
];
