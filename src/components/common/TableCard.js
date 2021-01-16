import React, { useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Loading } from './Loading';
import { getMedias } from '../../redux/actions';
import { Button, ButtonGroup } from 'react-bootstrap';

export const TableCard = ({ setActions }) => {
	const {
		media: { medias, mediasFetching, mediaAdded },
		songEdit: { loaded }
	} = useSelector(({ media, songEdit }) => ({ media, songEdit }));
	useEffect(() => {
		getMedias();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (mediaAdded || loaded) {
			getMedias();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediaAdded, loaded]);
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
									<th>Author</th>
									<th>Date</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{medias.map((media, mediaIndex) => (
									<tr key={mediaIndex}>
										<th scope='row'>{mediaIndex + 1}</th>
										<td>{media.title}</td>
										<td>{media.type}</td>
										<td>{media.author}</td>
										<td>{moment(media.actionDate).format('DD/MM/YYYY')}</td>
										<td>
											<ButtonGroup size='sm'>
												{media.type === 'audio' ? (
													<Button
														size='sm'
														onClick={() => setActions('play', media)}
													>
														<i className='fa fa-step-forward'></i>
													</Button>
												) : null}
												{media.type !== 'image' ? (
													<>
														<Button
															size='sm'
															variant='success'
															onClick={() => setActions('edit', media)}
														>
															<i className='fa fa-pencil'></i>
														</Button>
														<Button
															size='sm'
															variant='danger'
															onClick={() => setActions('del', media)}
														>
															<i className='fa fa-trash'></i>
														</Button>
													</>
												) : null}
											</ButtonGroup>
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
