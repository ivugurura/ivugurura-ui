import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Pagination from 'react-bootstrap-4-pagination';
import { Loading } from './Loading';
import { getMedias } from '../../redux/actions';
import { Button, ButtonGroup } from 'react-bootstrap';

const initialPaginate = { pageSize: 10, pageNumber: 1 };
export const TableCard = ({ setActions, user = {} }) => {
	const [paginator, setPaginator] = useState(initialPaginate);
	const {
		media: { medias, totalItems, mediasFetching, mediaAdded },
		songEdit: { loaded },
		songDel: { loaded: deleted }
	} = useSelector((actions) => actions);
	useEffect(() => {
		const { pageNumber, pageSize } = paginator;
		getMedias('all', pageNumber, pageSize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paginator]);
	useEffect(() => {
		if (mediaAdded || loaded || deleted) {
			getMedias('all', paginator.pageNumber, paginator.pageSize);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediaAdded, loaded, deleted]);
	const onPageChage = (currentPage) => {
		setPaginator({ ...paginator, pageNumber: currentPage });
	};
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
									<th>
										<i className='fa fa-download'></i>
									</th>
									<th>Shares</th>
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
										<td>{media.downloads}</td>
										<td>{media.shares}</td>
										<td>{moment(media.actionDate).format('DD/MM/YYYY')}</td>
										<td>
											<ButtonGroup size='sm'>
												{media.type === 'audio' && (
													<Button
														size='sm'
														onClick={() => setActions('play', media)}
													>
														<i className='fa fa-step-forward'></i>
													</Button>
												)}
												{media.type !== 'image' && Number(user.role) < 3 && (
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
												)}
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
			<div className='card-footer'>
				{totalItems > 0 && (
					<Pagination
						totalPages={Math.ceil(totalItems / paginator.pageSize)}
						currentPage={paginator.pageNumber}
						prevNex
						threeDots
						size='sm'
						onClick={onPageChage}
					/>
				)}
			</div>
		</div>
	);
};
