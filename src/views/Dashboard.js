import React, { useEffect, useState } from 'react';
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
		const { pageNumber, pageSize } = paginator;
		getDashboardTopics(pageNumber, pageSize);
		getDashboadCount();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
