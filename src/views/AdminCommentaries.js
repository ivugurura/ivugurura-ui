import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AdminPageHeader, CustomTable } from '../components/common';
import { commentsColumns } from '../components/tableColumns';
import { Page } from '../components';
import { useSelector } from 'react-redux';
import { ActionConfirm } from '../components/models';
import { getAdminComments, publishAComment } from '../redux/actions';

const initialPaginate = { pageSize: 10, pageNumber: 1 };
export const AdminCommentaries = () => {
	const [aeAction, setAeAction] = useState('');
	const [showActionConf, setShowActionConf] = useState(false);
	const [currentComment, setCurrentComment] = useState(null);
	const [paginator, setPaginator] = useState(initialPaginate);
	const { adminComments, user, publishComment } = useSelector(
		({ adminComments, user, publishComment }) => ({
			adminComments,
			user,
			publishComment
		})
	);
	useEffect(() => {
		if (publishComment.loaded) {
			setShowActionConf(false);
		}
	}, [publishComment]);
	useEffect(() => {
		const { pageNumber, pageSize } = paginator;
		getAdminComments(pageNumber, pageSize);
	}, [paginator]);
	const { comments, loading, totalItems } = adminComments;
	const setActions = (action = '', comment = {}) => {
		setCurrentComment(comment);
		if (action === 'publish') {
			setAeAction(comment.isPublished ? 'Unpublish' : 'Publish');
			setShowActionConf(true);
		}
	};
	const onPageChage = (currentPage) => {
		setPaginator({ ...paginator, pageNumber: currentPage });
	};
	return (
		<Page title='Topics commentaries'>
			<ActionConfirm
				title='Confirm published'
				show={showActionConf}
				onHide={() => setShowActionConf(false)}
				action={aeAction}
				description={currentComment ? currentComment.content : ''}
				loading={publishComment.loading}
				onAction={() => publishAComment(currentComment.id)}
			/>
			<AdminPageHeader name='Topics commentaries' />
			<section className='tables'>
				<Container fluid>
					<Row>
						<Col sm={12} md={10}>
							{/* <Commentaries loading={loading} comments={comments} /> */}
							<CustomTable
								title='Commentaries to the topics'
								data={comments}
								dataCount={totalItems}
								columns={commentsColumns(user.info, setActions)}
								currentPage={paginator.pageNumber}
								pageCount={Math.ceil(totalItems / paginator.pageSize)}
								itemPerPage={paginator.pageSize}
								loading={loading}
								isBordered={false}
								size='md'
								onChangePage={onPageChage}
							/>
						</Col>
						<Col sm={12} md={2}>
							<h1 className='display-3'>
								{comments.filter((c) => !c.isPublished).length}
							</h1>
							<span>Commentaries</span>
						</Col>
					</Row>
				</Container>
			</section>
		</Page>
	);
};

export default AdminCommentaries;
