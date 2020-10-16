import React, { useEffect, useState } from 'react';
import VideoPlayer from 'react-player';
import { AdminPageHeader, Loading } from '../components/common';
import { Col, Row, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums, getMedias } from '../redux/actions';
import { AddEditMedia, Page } from '../components';
import { AddVideo } from '../components/models';

export const AdminVideo = () => {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const { medias, mediasFetching, mediaAdded } = useSelector(
		({ media }) => media
	);
	useEffect(() => {
		dispatch(getMedias('video'));
		dispatch(getAlbums());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getMedias, getMedias, mediaAdded]);
	return (
		<Page title='Video setting'>
			<AddVideo show={show} onHide={() => setShow(false)}>
				<AddEditMedia />
			</AddVideo>
			<AdminPageHeader
				name='Media/video'
				btnTitle='Add new video'
				btnAction={() => setShow(true)}
			/>
			<section className='tables'>
				<Container fluid>
					<Row>
						{mediasFetching ? (
							<Loading />
						) : (
							medias.map((media, mediaIndex) => (
								<Col sm={12} md={4} key={mediaIndex}>
									<Card>
										<Card.Header>{media.title}</Card.Header>
										<Card.Body>
											<VideoPlayer
												url={media.mediaLink}
												playing={false}
												width='100%'
											/>
										</Card.Body>
									</Card>
								</Col>
							))
						)}
					</Row>
				</Container>
			</section>
		</Page>
	);
};
export default AdminVideo;
