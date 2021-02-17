import { Button, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { truncate } from '../../utils/constants';

export const commentsColumns = (user = {}, setActions) => [
	{
		label: 'Commentor info',
		content: (item) => (
			<OverlayTrigger
				placement='top'
				overlay={
					<Popover id={item.id}>
						<Popover.Title as='h3'>{item.names}</Popover.Title>
						<Popover.Content>
							Email: {item.email}
							<br />
							Website: {item.website}
						</Popover.Content>
					</Popover>
				}
			>
				<div>
					<strong>{item.names}</strong>
					<br />
					{item.email}
				</div>
			</OverlayTrigger>
		)
	},
	{ label: 'Content', path: 'content' },
	{
		label: 'Topic title',
		content: (item) => (
			<OverlayTrigger
				placement='top'
				overlay={
					<Popover id={item.id}>
						<Popover.Title as='h3'>{item.topic.title}</Popover.Title>
						<Popover.Content>{item.topic.description}</Popover.Content>
					</Popover>
				}
			>
				<div>{truncate(item.topic.title, 30)}</div>
			</OverlayTrigger>
		)
	},
	{
		label: 'Is published',
		content: (item) => (item.isPublished ? 'Yes' : 'No')
	},
	{
		label: 'Actions',
		content: (item) =>
			item.userId === user.id ||
			(Number(user.role) < 3 && (
				<ButtonGroup size='sm'>
					<Button
						size='sm'
						variant={item.isPublished ? 'primary' : 'info'}
						onClick={() => setActions('publish', item)}
					>
						{item.isPublished ? 'Unpublish' : 'Publish'}
					</Button>
				</ButtonGroup>
			))
	}
];
