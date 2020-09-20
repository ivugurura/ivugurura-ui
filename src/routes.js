import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Main,
  Home,
  TopicView,
  Dashboard,
  AdminMain,
  AddEditTopic,
  Login,
  CategoryTopics,
  AdminAudio,
  AdminVideo,
  AdminSetting,
  AdminCommentaries,
  NotFound
} from './views';

export const routes = [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/admin',
    component: AdminMain,
    // eslint-disable-next-line no-sparse-arrays
    routes: [
      {
        path: '/admin',
        exact: true,
        component: Dashboard
      },
      {
        path: '/admin/add-topic',
        exact: true,
        component: AddEditTopic
      },
      {
        path: '/admin/audios',
        exact: true,
        component: AdminAudio
      },
      {
        path: '/admin/videos',
        exact: true,
        component: AdminVideo
      },
      {
        path: '/admin/setting',
        exact: true,
        component: AdminSetting
      },
      {
        path: '/admin/commentaries',
        exact: true,
        component: AdminCommentaries
      },
      {
        path: '/admin/edit-topic/:topicSlug',
        exact: true,
        component: AddEditTopic
      }
    ]
  },
  {
    path: '/',
    component: Main,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/topics/:topicSlug',
        exact: true,
        component: TopicView
      },
      {
        path: '/topics/categories/:categorySlug',
        exact: true,
        component: CategoryTopics
      },
      {
        path: '/errors/error-400',
        exact: true,
        component: NotFound
      },
      {
        component: () => <Redirect to='/' />
      }
    ]
  }
];
