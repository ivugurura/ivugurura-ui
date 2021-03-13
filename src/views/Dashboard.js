import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { AdminPageHeader, CustomTable, Loading } from '../components/common';
import { useSelector } from 'react-redux';
import {
	getDashboadCount,
	getDashboardTopics,
	updateTopic,
	resetTopicAction
} from '../redux/actions';
import { AdminCounts, Page } from '../components';
import { topicsColumns } from '../components/tableColumns';
import { ActionConfirm } from '../components/models';

const initialPaginate = { pageSize: 10, pageNumber: 1 };
export const Dashboard = ({ history }) => {
	const [currentTopic, setCurrentTopic] = useState(null);
	const [aeAction, setAeAction] = useState('');
	const [showActionConf, setShowActionConf] = useState(false);
	const [paginator, setPaginator] = useState(initialPaginate);
	const [searchValue, setSearchValue] = useState('');
	const {
		dashboard,
		topicEdit: { done, loading },
		user
	} = useSelector(({ dashboard, topicEdit, user }) => ({
		dashboard,
		topicEdit,
		user
	}));
	useEffect(() => {
		getDashboadCount();
	}, []);
	useEffect(() => {
		const { pageNumber, pageSize } = paginator;
		getDashboardTopics(pageNumber, pageSize, searchValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paginator, searchValue]);
	useEffect(() => {
		if (done) {
			const { pageNumber, pageSize } = paginator;
			getDashboardTopics(pageNumber, pageSize);
			setShowActionConf(false);
			getDashboadCount();
			resetTopicAction('edit');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [done, paginator]);
	const setActions = (action = '', topic = {}) => {
		setCurrentTopic(topic);
		if (action === 'publish') {
			setAeAction(topic.isPublished ? 'Unpublish' : 'Publish');
			setShowActionConf(true);
		}
		if (action === 'del') {
			setAeAction('DELETE');
			setShowActionConf(true);
		}
		if (action === 'edit') {
			history.push(`/admin/edit-topic/${topic.slug}`);
		}
	};
	const onPageChage = (currentPage) => {
		setPaginator({ ...paginator, pageNumber: currentPage });
	};
	const onSelectPageChage = ({ target }) => {
		setPaginator({ pageSize: target.value, pageNumber: 1 });
	};
	const onSearchChange = ({ target }) => {
		setSearchValue(target.value);
		setPaginator({ pageSize: 10, pageNumber: 1 });
	};
	return (
		<Page title='Dashboard'>
			<AdminPageHeader
				name='Dashboard'
				btnTitle='Add topic'
				btnAction={() => history.push('/admin/add-topic')}
			/>
			<ActionConfirm
				title='Confirm the action'
				show={showActionConf}
				onHide={() => setShowActionConf(false)}
				action={aeAction.toUpperCase()}
				description={currentTopic ? currentTopic.title : ''}
				onAction={() => {
					updateTopic(
						{ isPublished: !currentTopic.isPublished },
						currentTopic.slug
					);
				}}
				loading={loading}
			/>
			{/* <section className='dashboard-counts no-padding-top'>
			</section> */}
			<div className='container-fluid '>
				{dashboard.countLoading ? (
					<Loading />
				) : (
					<AdminCounts count={dashboard.counts} user={user.info} />
				)}
			</div>

			<section className='updates no-padding-top'>
				<div className='container-fluid'>
					<Form inline>
						<Form.Control
							placeholder='Search anything'
							value={searchValue}
							onChange={onSearchChange}
						/>
						<Form.Control
							as='select'
							value={paginator.pageSize}
							onChange={onSelectPageChage}
						>
							{[5, 10, 20, 25, 50].map((item) => (
								<option value={item} key={item}>
									{item}
								</option>
							))}
						</Form.Control>
					</Form>
					<CustomTable
						title='Recent topic updates'
						data={dashboard.topics}
						columns={topicsColumns(user.info, setActions)}
						currentPage={paginator.pageNumber}
						pageCount={Math.ceil(dashboard.totalItems / paginator.pageSize)}
						itemPerPage={paginator.pageSize}
						dataCount={dashboard.totalItems}
						loading={dashboard.topicsLoading}
						isBordered={false}
						size='md'
						onChangePage={onPageChage}
					/>
				</div>
			</section>
		</Page>
	);
};
export default Dashboard;
