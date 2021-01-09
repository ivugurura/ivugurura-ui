import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loading } from './Loading';
import { getMedias } from '../../redux/actions';
import { Button } from 'react-bootstrap';

export const TableCard = ({ setCurrent }) => {
	const { medias, mediasFetching, mediaAdded } = useSelector(
		({ media }) => media
	);
	useEffect(() => {
		getMedias();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediaAdded]);
	return (
		<div className='card'>
			<div className='card-header d-flex align-items-center'>Media list</div>
			<div className='card-body'>
				<div className='table-responsive'>
					{mediasFetching ? (
						<Loading />
					) : medias.length ? (
						<table className='table table-hover'>
							<thead>
								<tr>
									<th>#</th>
									<th>Title</th>
									<th>Type</th>
									<th>Album</th>
									<th>Language</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{medias.map((media, mediaIndex) => (
									<tr key={mediaIndex}>
										<th scope='row'>{mediaIndex + 1}</th>
										<td>{media.title}</td>
										<td>{media.type}</td>
										<td>{media.album.name}</td>
										<td>{media.language.name}</td>
										<td>
											{media.type === 'audio' ? (
												<Button size='sm' onClick={() => setCurrent(media)}>
													Play
												</Button>
											) : null}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<h5 className='text-center'>No media</h5>
					)}
				</div>
			</div>
		</div>
	);
};
