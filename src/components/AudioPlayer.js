import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Pagination from 'react-bootstrap-4-pagination';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { ButtonGroup, Card, Button, Badge, Table } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getMedias } from '../redux/actions';
import { Loading } from './common';
import { Share } from './Share';
import { audioPath } from '../helpers/utils';
import { truncate } from '../utils/constants';

const initialPaginate = { pageSize: 50, pageNumber: 1 };
export const AudioPlayer = ({
	trancNumber = 12,
	notOnlyIcon = false,
	withPaginations = false
}) => {
	const [currentAudio, setCurrentAudio] = useState({});
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [paginator, setPaginator] = useState(initialPaginate);

	const { medias, mediasFetching, totalItems } = useSelector(
		({ media }) => media
	);
	useEffect(() => {
		const { pageNumber, pageSize } = paginator;
		const pageSz = withPaginations ? pageSize : 5;
		getMedias('audio', pageNumber, pageSz);
	}, [paginator, withPaginations]);
	useEffect(() => {
		if (medias.length) {
			setCurrentAudio(medias[0]);
		}
	}, [medias]);
	useEffect(() => {
		if (currentAudio.slug) {
			const theIndex = medias.findIndex((m) => m.slug === currentAudio.slug);
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
	const DL_ROUTE = process.env.REACT_APP_API_URL + '/api/v1/albums/download/';

	const onPageChage = (currentPage) => {
		setPaginator({ ...paginator, pageNumber: currentPage });
	};
	return (
		<Card>
			<H5AudioPlayer
				muted
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
			<Table responsive='sm'>
				<thead>
					<tr>
						<th>Title, Author</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{mediasFetching && !medias.length ? (
						<Loading />
					) : medias.length ? (
						medias.map((media, mediaIndex) => (
							<tr
								className={
									media.slug === currentAudio.slug
										? 'table-primary'
										: 'table-secondary'
								}
								key={mediaIndex}
							>
								<td>{`${truncate(media.title, 25)} ${
									media.author !== null
										? '--' + truncate(media.author, trancNumber)
										: ''
								}`}</td>
								<td>
									<ButtonGroup size='sm' aria-label='Actions buttons'>
										<Button size='sm' onClick={() => setCurrentAudio(media)}>
											<i className='fa fa-play'></i> {notOnlyIcon && 'Play'}
										</Button>
										<a
											className='btn btn-sm btn-info'
											rel='noreferrer'
											href={DL_ROUTE + media.slug}
											target='_blank'
										>
											<i className='fa fa-download'></i>
											{notOnlyIcon && 'Download'}
										</a>
										<Share
											title={media.title}
											href={DL_ROUTE + media.slug}
											onShare={console.log('Click')}
										/>
									</ButtonGroup>
								</td>
							</tr>
						))
					) : null}
				</tbody>
			</Table>
			<Card.Footer>
				{withPaginations && totalItems > 0 && (
					<Pagination
						totalPages={Math.ceil(totalItems / paginator.pageSize)}
						currentPage={paginator.pageNumber}
						prevNex
						threeDots
						size='sm'
						onClick={onPageChage}
					/>
				)}
			</Card.Footer>
		</Card>
	);
};
