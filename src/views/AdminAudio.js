import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AdminPageHeader, TableCard, Loading } from '../components/common';
import { Col, Row, Card, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAlbums } from '../redux/actions';
import { AddAlbum, AddEditMedia } from '../components/models';
import { Page } from '../components';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { audioPath } from '../helpers/utils';

export const AdminAudio = () => {
	const [show, setShow] = useState(false);
	const [showAddEdit, setShowAddEdit] = useState(false);
	const [currentAudio, setCurrentAudio] = useState({});
	const {
		album: { albums, albumsFetching },
		media: { medias }
	} = useSelector(({ album, media }) => ({ album, media }));
	useEffect(() => {
		getAlbums();
	}, []);
	useEffect(() => {
		if (medias.length) {
			setCurrentAudio(medias[0]);
		}
	}, [medias]);
	return (
		<Page title='Audio setting'>
			<AddAlbum show={show} onHide={() => setShow(false)} />
			<AddEditMedia show={showAddEdit} onHide={() => setShowAddEdit(false)} />
			<AdminPageHeader
				name='Media/audio'
				btnTitle='Add new album'
				btnAction={() => setShow(true)}
			>
				<button
					className='btn btn-primary pull-right'
					onClick={() => setShowAddEdit(true)}
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
							<TableCard setCurrent={setCurrentAudio} />
						</Col>
						<Col xs={12} sm={12} md={4} lg={4}>
							{currentAudio.title ? (
								<Card style={{ width: '18rem' }}>
									<AudioPlayer
										autoPlay
										src={audioPath + currentAudio.mediaLink}
									/>
									<Card.Body>
										<Card.Title>{currentAudio.title}</Card.Title>
										<Card.Text>{currentAudio.description}</Card.Text>
									</Card.Body>
									<ListGroup className='list-group-flush'>
										<ListGroupItem>{currentAudio.language.name}</ListGroupItem>
										<ListGroupItem>
											{currentAudio.type.toUpperCase()}
										</ListGroupItem>
										<ListGroupItem>{currentAudio.createdAt}</ListGroupItem>
									</ListGroup>
									<Card.Body>
										<Card.Link href='#'>Click to download</Card.Link>
										<Card.Link href='#'>Link</Card.Link>
									</Card.Body>
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
