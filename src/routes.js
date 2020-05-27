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
    // eslint-disable-next-line no-sparse-arrays
    routes: [
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
      ,
      {
        path: '/admin/edit-topic/:topicSlug',
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
        path: '/login',
        exact: true,
        component: Login,
      },
      {
        path: '/:topicSlug/view',
        exact: true,
        component: TopicView,
      },
    ],
  },
];
