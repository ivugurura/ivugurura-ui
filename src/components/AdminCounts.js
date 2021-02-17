import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin-count.css';

export const AdminCounts = ({ count = {}, user = {} }) => {
	const lgClassName =
		Number(user.role) < 3 ? 'col-lg-2 col-md-4' : 'col-lg-3 col-md-3';
	return (
		<div className='row'>
			<div className={`${lgClassName} col-sm-6 col-xs-12`}>
				<div className='mini-stat clearfix bg-published rounded'>
					<span className='mini-stat-icon'>
						<i className='fa fa-map-o fg-icon'></i>
					</span>
					<div className='mini-stat-info'>
						<span className='stat-count'>{count.published}</span>
						<span className='stat-info'>Published</span>
					</div>
				</div>
			</div>
			<div className={`${lgClassName} col-sm-6 col-xs-12`}>
				<div className='mini-stat clearfix bg-for-action rounded'>
					<span className='mini-stat-icon'>
						<i className='fa fa-map-o fg-icon'></i>
					</span>
					<div className='mini-stat-info'>
						<span className='stat-count'>{count.unPublished}</span>
						<span className='stat-info'>Unpublished</span>
					</div>
				</div>
			</div>
			<div className={`${lgClassName} col-sm-6 col-xs-12`}>
				<div className='mini-stat clearfix bg-media rounded'>
					<span className='mini-stat-icon'>
						<i className='fa fa-music fg-icon'></i>
					</span>
					<div className='mini-stat-info'>
						<span className='stat-count'>{count.songs}</span>
						<span className='stat-info'>Audio</span>
					</div>
				</div>
			</div>
			<div className={`${lgClassName} col-sm-6 col-xs-12`}>
				<div className='mini-stat clearfix bg-media rounded'>
					<span className='mini-stat-icon'>
						<i className='fa fa-video-camera fg-icon'></i>
					</span>
					<div className='mini-stat-info'>
						<span className='stat-count'>{count.videos}</span>
						<span className='stat-info'>Videos</span>
					</div>
				</div>
			</div>
			{Number(user.role) < 3 && (
				<>
					<div className={`${lgClassName} col-sm-6 col-xs-12`}>
						<div className='mini-stat clearfix bg-for-action rounded'>
							<Link to='/admin/commentaries'>
								<span className='mini-stat-icon'>
									<i className='fa fa-comments fg-icon'></i>
								</span>
								<div className='mini-stat-info'>
									<span className='stat-count'>{count.commentaries}</span>
									<span className='stat-info'>Commentaries</span>
								</div>
							</Link>
						</div>
					</div>
					<div className={`${lgClassName} col-sm-6 col-xs-12`}>
						<div className='mini-stat clearfix bg-published rounded'>
							<Link to='/admin/users'>
								<span className='mini-stat-icon'>
									<i className='fa fa-users fg-icon'></i>
								</span>
								<div className='mini-stat-info'>
									<span className='stat-count'>{count.users}</span>
									<span className='stat-info'>System Users</span>
								</div>
							</Link>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
