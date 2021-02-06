import React, { useState, useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AdminPageHeader, CustomTable } from '../components/common';
import { AddEditUser } from '../components/models';
import { Page } from '../components';
import { getSystemUsers } from '../redux/actions';
import { usersColumns } from '../components/tableColumns';

const initialPaginate = { pageSize: 20, pageNumber: 1 };
export const SystemUsers = () => {
	const [show, setShow] = useState(false);
	const [paginator, setPaginator] = useState(initialPaginate);
	const states = useSelector(({ user, usersGet, userAdd, userEdit }) => ({
		user,
		usersGet,
		userAdd,
		userEdit
	}));
	const { user, usersGet, userAdd, userEdit } = states;
	useEffect(() => {
		const { pageNumber, pageSize } = paginator;
		getSystemUsers({ page: pageNumber, pageSize });
	}, [paginator]);
	const onPageChage = (currentPage) => {
		setPaginator({ ...paginator, pageNumber: currentPage });
	};
	return (
		<Page title='Setting'>
			<AddEditUser show={show} onHide={() => setShow(false)} />
			<AdminPageHeader
				name='System Users'
				btnTitle='Add a new user'
				btnAction={() => setShow(true)}
			/>
			<section className='tables'>
				<Container fluid>
					<Row>
						<Col sm={12} md={8}>
							<CustomTable
								data={usersGet.users}
								columns={usersColumns(user.info)}
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
