import React, { useState, useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AdminPageHeader, CustomTable } from '../components/common';
import { AddEditUser, ActionConfirm } from '../components/models';
import { Page } from '../components';
import { deleteUser, getSystemUsers } from '../redux/actions';
import { usersColumns } from '../components/tableColumns';

const initialPaginate = { pageSize: 20, pageNumber: 1 };
export const SystemUsers = () => {
	const [showAddEdit, setShowAddEdit] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [aeAction, setAeAction] = useState('');
	const [showActionConf, setShowActionConf] = useState(false);
	const [paginator, setPaginator] = useState(initialPaginate);
	const {
		user,
		usersGet,
		userRm: { done, loading }
	} = useSelector(({ user, usersGet, userRm }) => ({
		user,
		usersGet,
		userRm
	}));
	useEffect(() => {
		const { pageNumber, pageSize } = paginator;
		setShowActionConf(false);
		getSystemUsers({ page: pageNumber, pageSize });
	}, [paginator]);
	useEffect(() => {
		if (done) {
			const { pageNumber, pageSize } = paginator;
			getSystemUsers({ page: pageNumber, pageSize });
			setShowActionConf(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [done]);
	const onPageChage = (currentPage) => {
		setPaginator({ ...paginator, pageNumber: currentPage });
	};
	const setActions = (action = '', user = {}) => {
		setCurrentUser(user);
		if (action === 'edit') {
			setAeAction('edit');
			setShowAddEdit(true);
		}
		if (action === 'del') {
			setShowActionConf(true);
		}
	};
	return (
		<Page title='Setting'>
			<AddEditUser
				show={showAddEdit}
				currentUser={currentUser}
				action={aeAction}
				onHide={() => setShowAddEdit(false)}
			/>
			<AdminPageHeader
				name='System Users'
				btnTitle='Add a new user'
				btnAction={() => {
					setAeAction('add');
					setCurrentUser(null);
					setShowAddEdit(true);
				}}
			/>
			<ActionConfirm
				title='Confirm delete'
				show={showActionConf}
				onHide={() => setShowActionConf(false)}
				action='DELETE'
				description={currentUser ? currentUser.names : ''}
				onAction={() => deleteUser(currentUser.id)}
				loading={loading}
			/>
			<section className='tables'>
				<Container fluid>
					<Row>
						<Col sm={12} md={8}>
							<CustomTable
								title='List of registered users'
								data={usersGet.users}
								columns={usersColumns(user.info, setActions)}
								currentPage={paginator.pageNumber}
								pageCount={Math.ceil(usersGet.totalItems / paginator.pageSize)}
								itemPerPage={paginator.pageSize}
								dataCount={usersGet.totalItems}
								loading={usersGet.loading}
								onChangePage={onPageChage}
							/>
						</Col>
						<Col sm={12} md={4}>
							{/* <MenuSetting /> */}
						</Col>
					</Row>
				</Container>
			</section>
		</Page>
	);
};
export default SystemUsers;
