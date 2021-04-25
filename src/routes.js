import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { systemLanguage } from 'utils/constants';
import { Main, AdminMain } from './layouts';

export const routes = [
	{
		path: '/',
		exact: true,
		component: () => <Redirect to={`/${systemLanguage}`} />
	},
	{
		path: '/admin',
		component: AdminMain,
		routes: [
			{
				path: '/admin',
				exact: true,
				component: lazy(() => import('views/Dashboard'))
			},
			{
				path: '/admin/add-topic',
				exact: true,
				component: lazy(() => import('views/AddEditTopic'))
			},
			{
				path: '/admin/audios',
				exact: true,
				component: lazy(() => import('views/AdminAudio'))
			},
			{
				path: '/admin/users',
				exact: true,
				component: lazy(() => import('views/SystemUsers'))
			},
			{
				path: '/admin/setting',
				exact: true,
				component: lazy(() => import('views/AdminSetting'))
			},
			{
				path: '/admin/commentaries',
				exact: true,
				component: lazy(() => import('views/AdminCommentaries'))
			},
			{
				path: '/admin/edit-topic/:topicSlug',
				exact: true,
				component: lazy(() => import('views/AddEditTopic'))
			},
			{
				component: () => <Redirect to='/' />
			}
		]
	},
	{
		path: '/:language',
		component: Main,
		routes: [
			{
				path: '/:language',
				exact: true,
				component: lazy(() => import('views/Home'))
			},
			{
				path: '/:language/login',
				exact: true,
				component: lazy(() => import('views/Login'))
			},
			{
				path: '/:language/topics',
				exact: true,
				component: lazy(() => import('views/ViwTopics'))
			},
			{
				path: '/:language/topics/:topicSlug',
				exact: true,
				component: lazy(() => import('views/TopicView'))
			},
			{
				path: '/:language/topics/categories/:categorySlug',
				exact: true,
				component: lazy(() => import('views/ViwTopics'))
			},
			{
				path: '/:language/radio',
				exact: true,
				component: lazy(() => import('views/RadioRRV'))
			},
			{
				path: '/:language/audios',
				exact: true,
				component: lazy(() => import('views/Audios'))
			},
			{
				path: '/:language/errors/error-400',
				exact: true,
				component: lazy(() => import('views/NotFound'))
			},
			{
				component: () => <Redirect to='/' />
			}
		]
	}
];
