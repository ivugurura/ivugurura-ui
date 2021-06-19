import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import moment from 'moment';
import 'react-h5-audio-player/lib/styles.css';
import { AdminPageHeader, TableCard } from '../components/common';
import {
	Col,
	Row,
	Card,
	Container,
	Badge,
	ButtonGroup,
	Button
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deleteSong, getMediaCounts } from '../redux/actions';
import { AddAlbum, AddEditMedia, ActionConfirm } from '../components/models';
import { Page } from '../components';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { audioPath } from '../helpers/utils';

export const AdminAudio = () => {
	const [show, setShow] = useState(false);
	const [showAddEdit, setShowAddEdit] = useState(false);
	const [aeAction, setAeAction] = useState('');
	const [showActionConf, setShowActionConf] = useState(false);
	const [currentMedia, setCurrentMedia] = useState(null);
	const [song, setSong] = useState(null);
	const {
		media: { medias, totalItems },
		songDel: { loading, loaded },
		user,
		mediaCount: { counts }
	} = useSelector(({ media, songDel, user, mediaCount }) => ({
		media,
		songDel,
		user,
		mediaCount
	}));
	useEffect(() => {
		getMediaCounts();
	}, []);
	useEffect(() => {
		if (loaded) {
			setShowActionConf(false);
		}
	}, [loaded]);
	useEffect(() => {
		if (medias.length) {
			setSong(medias[0]);
		}
	}, [medias]);
	const setActions = (action = '', media = {}) => {
		setCurrentMedia(media);
		if (action === 'edit') {
			setAeAction('edit');
			setShowAddEdit(true);
		}
		if (action === 'del') {
			setShowActionConf(true);
		}
		if (action === 'play') {
			setSong(media);
		}
	};

	return (
		<Page title='Audio setting'>
			<AddAlbum show={show} onHide={() => setShow(false)} />
			<AddEditMedia
				show={showAddEdit}
				onHide={() => setShowAddEdit(false)}
				currentMedia={currentMedia}
				action={aeAction}
			/>
			<ActionConfirm
				title='Confirm delete'
				show={showActionConf}
				onHide={() => setShowActionConf(false)}
				action='DELETE'
				description={currentMedia ? currentMedia.title : ''}
				loading={loading}
				onAction={() => deleteSong(currentMedia.slug)}
			/>
			<AdminPageHeader
				name='Media/audio'
				btnTitle='Add new album'
				btnAction={() => setShow(true)}
			>
				<button
					className='btn btn-primary pull-right'
					onClick={() => {
						setAeAction('add');
						setCurrentMedia(null);
						setShowAddEdit(true);
					}}
				>
					Add new media
				</button>
			</AdminPageHeader>
			{Number(user.info.role) < 3 && (
				<Row>
					<Col xs={12} sm={12} md={12} lg={12}>
						<ButtonGroup size='sm' className='pull-right'>
							<Button onClick={() => setShow(true)}>Add a new album</Button>
							<Button
								variant='info'
								onClick={() => {
									setAeAction('add');
									setCurrentMedia(null);
									setShowAddEdit(true);
								}}
							>
								Add new media
							</Button>
						</ButtonGroup>
					</Col>
				</Row>
			)}
			<Row>
				<Col xs={12} sm={12} md={3} lg={3}>
					<h3>
						Audios <Badge variant='secondary'>{totalItems}</Badge>
					</h3>
				</Col>
				<Col xs={12} sm={12} md={3} lg={3}>
					<h3>
						Downloads <Badge variant='primary'>{counts.downloads || 0}</Badge>
					</h3>
				</Col>
				<Col xs={12} sm={12} md={3} lg={3}>
					<h3>
						Shares <Badge variant='info'>{counts.shares || 0}</Badge>
					</h3>
				</Col>
			</Row>
			<section className='tables no-padding-top'>
				<Container fluid>
					<Row>
						<Col xs={12} sm={12} md={9} lg={9}>
							<TableCard setActions={setActions} user={user.info} />
						</Col>
						<Col xs={12} sm={12} md={3} lg={3}>
							{song ? (
								<Card>
									<AudioPlayer src={audioPath + song.mediaLink} />
									<Card.Body>
										<Card.Title>
											{song.title}
											<h4>
												<Badge variant='primary'>{song.author}</Badge>
											</h4>
										</Card.Title>
									</Card.Body>
									<ListGroup className='list-group-flush'>
										<ListGroupItem>{song.language.name}</ListGroupItem>
										<ListGroupItem>
											{moment(song.actionDate).format('dddd, MMM DD, YYYY')}
										</ListGroupItem>
									</ListGroup>
									{/* <Card.Body>
										<Card.Link href='#'>Click to download</Card.Link>
										<Card.Link href='#'>Link</Card.Link>
									</Card.Body> */}
								</Card>
							) : null}
						</Col>
					</Row>
				</Container>
			</section>
		</Page>
	);
};
export default AdminAudio;
