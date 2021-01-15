import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import moment from 'moment';
import 'react-h5-audio-player/lib/styles.css';
import { AdminPageHeader, TableCard, Loading } from '../components/common';
import { Col, Row, Card, Container, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deleteSong, getAlbums } from '../redux/actions';
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
		album: { albums, albumsFetching },
		media: { medias },
		songDel: { loading, loaded }
	} = useSelector(({ album, media, songDel }) => ({ album, media, songDel }));
	useEffect(() => {
		getAlbums();
	}, []);
	useEffect(() => {
		if (loaded) {
			setShowActionConf(false);
			getAlbums();
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
				onAction={() => deleteSong(currentMedia.id)}
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
			<Row>
				{albumsFetching ? (
					<Loading />
				) : albums.length ? (
					albums.map((album, albumIndex) => (
						<Col xs={12} sm={12} md={3} lg={3} key={albumIndex}>
							<Card>
								<Card.Header>
									<h4>{album.name}</h4>
								</Card.Header>
							</Card>
						</Col>
					))
				) : (
					<h4 className='text-center'>No albums</h4>
				)}
			</Row>
			<section className='tables no-padding-top'>
				<Container fluid>
					<Row>
						<Col xs={12} sm={12} md={8} lg={8}>
							<TableCard setActions={setActions} />
						</Col>
						<Col xs={12} sm={12} md={4} lg={4}>
							{song ? (
								<Card style={{ width: '18rem' }}>
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
