import React, { useState, useEffect } from 'react';
import moment from 'moment';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { ButtonGroup, Card, Button, Badge } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getMedias } from '../redux/actions';
import { Loading } from './common';
import { audioPath } from '../helpers/utils';
import { truncate } from '../utils/constants';

export const AudioPlayer = () => {
	const [currentAudio, setCurrentAudio] = useState({});
	const [currentIndex, setCurrentIndex] = useState(-1);
	const { medias, mediasFetching } = useSelector(({ media }) => media);
	useEffect(() => {
		getMedias('audio');
	}, []);
	useEffect(() => {
		if (medias.length) {
			setCurrentAudio(medias[0]);
		}
	}, [medias]);
	useEffect(() => {
		if (currentAudio.id) {
			const theIndex = medias.findIndex((m) => m.id === currentAudio.id);
			setCurrentIndex(theIndex);
		}
	}, [currentAudio, medias]);
	const customControls = [
		RHAP_UI.LOOP,
		<Button
			size='sm'
			disabled={currentIndex === 0}
			onClick={() => setCurrentAudio(medias[currentIndex - 1])}
		>
			<i className='fa fa-step-backward'></i>
		</Button>,
		<Button
			size='sm'
			disabled={currentIndex === medias.length - 1}
			onClick={() => setCurrentAudio(medias[currentIndex + 1])}
		>
			<i className='fa fa-step-forward'></i>
		</Button>
	];
	const BASE_DOWNLOAD = process.env.REACT_APP_API_URL.includes('localhost')
		? `${process.env.REACT_APP_API_URL}`
		: '';
	const DL_ROUTE = BASE_DOWNLOAD + '/api/v1/albums/download/';
	return (
		<Card>
			<H5AudioPlayer
				src={audioPath + currentAudio.mediaLink}
				customAdditionalControls={customControls}
			/>
			<Card.Body>
				<Card.Text>
					{currentAudio.title} by {currentAudio.author}{' '}
					<Badge pill variant='info'>
						{moment(currentAudio.actionDate).format('dddd, MMM DD, YYYY')}
					</Badge>
				</Card.Text>
			</Card.Body>
			<ListGroup className='list-group-flush'>
				{mediasFetching ? (
					<Loading />
				) : medias.length ? (
					<div style={{ overflow: 'auto' }}>
						{medias.map((media, mediaIndex) => (
							<ListGroupItem
								variant={
									media.title === currentAudio.title ? 'primary' : 'danger'
								}
								key={mediaIndex}
							>
								{`${truncate(media.title, 25)} ${
									media.author !== null ? '--' + truncate(media.author, 12) : ''
								}`}
								<ButtonGroup
									size='sm'
									aria-label='Actions buttons'
									className='pull-right'
								>
									<Button size='sm' onClick={() => setCurrentAudio(media)}>
										<i className='fa fa-play'></i>
									</Button>
									<a
										className='btn'
										rel='noreferrer'
										href={DL_ROUTE + media.id}
										target='_blank'
									>
										<i className='fa fa-download'></i>
									</a>
								</ButtonGroup>
							</ListGroupItem>
						))}
					</div>
				) : null}
				{/* <ListGroupItem>{currentAudio.language.name}</ListGroupItem>
            <ListGroupItem>
              {currentAudio.type.toUpperCase()}
            </ListGroupItem>
            <ListGroupItem>{currentAudio.createdAt}</ListGroupItem> */}
			</ListGroup>
		</Card>
	);
};
