import React, { useState, useEffect } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import { Card } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getMedias } from '../redux/actions';
import { Loading } from './common';
import { audioPath } from '../helpers/utils';
import { Button } from 'react-bootstrap';

export const AudioPlayer = () => {
	const [currentAudio, setCurrentAudio] = useState({});
	const { medias, mediasFetching } = useSelector(({ media }) => media);
	useEffect(() => {
		getMedias('audio');
	}, []);
	useEffect(() => {
		if (medias.length) {
			setCurrentAudio(medias[0]);
		}
	}, [medias]);
	return (
		<Card>
			<H5AudioPlayer autoPlay src={audioPath + currentAudio.mediaLink} />
			<Card.Body>
				<Card.Text>{currentAudio.title}</Card.Text>
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
								{media.title}
								<Button
									size='sm'
									onClick={() => setCurrentAudio(media)}
									className='pull-right'
								>
									Play
								</Button>
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
