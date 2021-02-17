import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdminComments } from '../../redux/actions';
import { getRole } from '../../utils/constants';

const profileUrl = `${process.env.PUBLIC_URL}/img/admin.jpeg`;
export const AdminSideNav = () => {
	const {
		user: { info },
		adminComments: { comments },
		publishComment: { loaded }
	} = useSelector(({ user, adminComments, publishComment }) => ({
		user,
		adminComments,
		publishComment
	}));
	useEffect(() => {
		getAdminComments();
	}, []);
	useEffect(() => {
		if (loaded) {
			getAdminComments();
		}
	}, [loaded]);
	return (
		<nav className='side-navbar'>
			<div className='sidebar-header d-flex align-items-center'>
				<div className='avatar'>
					<img
						src={profileUrl}
						alt='...'
						className='img-fluid rounded-circle'
					/>
				</div>
				<div className='title'>
					<h4>{info.names}</h4>
					<p>{getRole(info.role)}</p>
				</div>
			</div>
			<span className='heading'>Main</span>
			<ul className='list-unstyled'>
				<li className=''>
					<Link to='/admin'>
						<i className='icon-home'></i>Dashboard
					</Link>
				</li>
				<li>
					<a href='#topic' aria-expanded='false' data-toggle='collapse'>
						<i className='icon-interface-windows'></i>Topic
					</a>
					<ul id='topic' className='collapse list-unstyled'>
						<li>
							<Link to='/admin/add-topic'>Add new</Link>
						</li>
					</ul>
				</li>
				<li>
					<a href='#media' aria-expanded='false' data-toggle='collapse'>
						<i className='icon-grid'></i>Media
					</a>
					<ul id='media' className='collapse list-unstyled'>
						<li>
							<Link to='/admin/audios'>Audios</Link>
							{/* <Link to='/admin/videos'>Videos</Link> */}
						</li>
					</ul>
				</li>
			</ul>
			<span className='heading'>Extras</span>
			{Number(info.role) < 3 && (
				<ul className='list-unstyled'>
					<li>
						<Link to='/admin/commentaries'>
							<i className='icon-grid'></i>Commentaries(
							<strong>{comments.filter((c) => !c.isPublished).length}</strong>)
						</Link>
					</li>
					<li>
						<Link to='/admin/setting'>
							<i className='icon-screen'></i>Setting
						</Link>
					</li>
					<li>
						<Link to='/admin/users'>
							<i className='icon-user'></i>System users
						</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};
