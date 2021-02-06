import moment from 'moment';
import { getRole } from '../../utils/constants';

export const usersColumns = (user = {}) => [
	{
		label: 'Names(First/Last name)',
		content: (item) => (user.id === item.id ? item.names + 'You' : item.names)
	},
	{ path: 'username', label: 'User name' },
	{ path: 'email', label: 'Email' },
	{ label: 'User role', content: (item) => getRole(item.role) },
	{
		label: 'Registed',
		content: (item) => moment(item.createdAt).format('MMMM Do YYYY')
	}
];
