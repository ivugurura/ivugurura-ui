import React from 'react';
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
						<span>{count.published}</span>
						Published
					</div>
				</div>
			</div>
			<div className={`${lgClassName} col-sm-6 col-xs-12`}>
				<div className='mini-stat clearfix bg-for-action rounded'>
					<span className='mini-stat-icon'>
						<i className='fa fa-map-o fg-icon'></i>
					</span>
					<div className='mini-stat-info'>
						<span>{count.unPublished}</span>
						Unpublished
					</div>
				</div>
			</div>
			<div className={`${lgClassName} col-sm-6 col-xs-12`}>
				<div className='mini-stat clearfix bg-media rounded'>
					<span className='mini-stat-icon'>
						<i className='fa fa-music fg-icon'></i>
					</span>
					<div className='mini-stat-info'>
						<span>{count.songs}</span>
						Audio
					</div>
				</div>
			</div>
			<div className={`${lgClassName} col-sm-6 col-xs-12`}>
				<div className='mini-stat clearfix bg-media rounded'>
					<span className='mini-stat-icon'>
						<i className='fa fa-video-camera fg-icon'></i>
					</span>
					<div className='mini-stat-info'>
						<span>{count.videos}</span>
						Videos
					</div>
				</div>
			</div>
			{Number(user.role) < 3 && (
				<>
					<div className={`${lgClassName} col-sm-6 col-xs-12`}>
						<div className='mini-stat clearfix bg-for-action rounded'>
							<span className='mini-stat-icon'>
								<i className='fa fa-comments fg-icon'></i>
							</span>
							<div className='mini-stat-info'>
								<span>{count.commentaries}</span>
								Commentaries
							</div>
						</div>
					</div>
					<div className={`${lgClassName} col-sm-6 col-xs-12`}>
						<div className='mini-stat clearfix bg-published rounded'>
							<span className='mini-stat-icon'>
								<i className='fa fa-users fg-icon'></i>
							</span>
							<div className='mini-stat-info'>
								<span>{count.users}</span>
								System Users
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
