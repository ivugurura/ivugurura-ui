import moment from 'moment';
import { Button, ButtonGroup } from 'react-bootstrap';
import { fromString } from 'html-to-text';
import { truncate } from '../../utils/constants';

export const topicsColumns = (user = {}, setActions) => [
	{
		label: '',
		content: () => (
			<div className='icon'>
				<i className='icon-rss-feed'></i>
			</div>
		)
	},
	{ label: 'Topic title', path: 'title' },
	{
		label: 'Simple description',
		content: (item) => (
			<>
				{truncate(fromString(item.content), 200)} , by{' '}
				<strong> {item.user.names}</strong>
			</>
		)
	},
	{ label: 'User views', content: (item) => `${item.views.length} views` },
	{
		label: 'Published',
		content: (item) => moment(item.createdAt).format('MMMM Do YYYY')
	},
	{
		label: 'Actions',
		content: (item) =>
			item.userId === user.id || Number(user.role) < 3 ? (
				<ButtonGroup size='sm'>
					<Button
						size='sm'
						variant={item.isPublished ? 'primary' : 'info'}
						onClick={() => setActions('publish', item)}
					>
						{item.isPublished ? 'Unpublish' : 'Publish'}
					</Button>
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
						disabled
						onClick={() => setActions('del', item)}
					>
						<i className='fa fa-trash'></i>
					</Button>
				</ButtonGroup>
			) : null
	}
];
