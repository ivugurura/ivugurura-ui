import moment from 'moment';
import { Button, ButtonGroup } from 'react-bootstrap';
import { getRole } from '../../utils/constants';

export const usersColumns = (user = {}, setActions) => [
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
	},
	{
		label: 'Is Active',
		content: (item) => (item.isActive ? 'Yes' : 'No')
	},
	{
		label: 'Actions',
		content: (item) =>
			item.id !== user.id && Number(user.role) < 3 ? (
				<ButtonGroup size='sm'>
					<Button
						size='sm'
						variant='success'
						onClick={() => setActions('edit', item)}
					>
						<i className='fa fa-pencil'></i>
					</Button>
					<Button
						size='sm'
						variant='danger'
						onClick={() => setActions('del', item)}
					>
						<i className='fa fa-trash'></i>
					</Button>
				</ButtonGroup>
			) : (
				<strong>YOU</strong>
			)
	}
];
