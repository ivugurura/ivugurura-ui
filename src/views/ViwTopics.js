import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Breadcrumb } from 'react-bootstrap';
import Pagination from 'react-bootstrap-4-pagination';
import { RecentTopics, Communique, Loading } from '../components/common';
import { bgStyles } from '../utils/styles';
import { useSelector } from 'react-redux';
import { getCategoryDetail, getTopics } from '../redux/actions';
import { Link } from 'react-router-dom';
import { scrollToRef } from '../utils/constants';
import { Page } from '../components';
import { useTranslation } from 'react-i18next';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
const initialPaginate = { pageSize: 12, pageNumber: 1 };
export const ViwTopics = ({ match }) => {
	const categoriesRef = useRef(null);
	const [paginator, setPaginator] = useState(initialPaginate);
	const { t } = useTranslation();
	const { categorySlug } = match.params;
	const {
		topic: { categoryLoading, categoryTopics, totalItems },
		oneCategory: { categoryFetching, category }
	} = useSelector(({ topic, oneCategory }) => ({
		topic,
		oneCategory
	}));
	useEffect(() => {
		if (categorySlug) {
			scrollToRef(categoriesRef);
			getCategoryDetail(categorySlug);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categorySlug]);
	useEffect(() => {
		const { pageNumber, pageSize } = paginator;
		if (categorySlug && category.id) {
			getTopics({ page: pageNumber, pageSize, category: category.id });
		} else if (!categorySlug) {
			getTopics({ page: pageNumber, pageSize });
		}
	}, [categorySlug, category.id, paginator]);
	const onPageChange = (currentPage) => {
		setPaginator({ ...paginator, pageNumber: currentPage });
	};
	const totalPages = Math.ceil(totalItems / paginator.pageSize);
	return (
		<Page title={category.name || t('app:topics')}>
			<Communique />
			<Container fluid>
				<Row>
					<Col xs={12} md={9} lg={9}>
						<Row>
							<Col>
								{categoryFetching ? (
									<Loading />
								) : (
									<Breadcrumb>
										<Breadcrumb.Item>{t('app:topics')}</Breadcrumb.Item>
										{category.slug ? (
											<>
												<Breadcrumb.Item>
													{category.parent.name}
												</Breadcrumb.Item>
												<Breadcrumb.Item active>
													{category.name}
												</Breadcrumb.Item>
											</>
										) : (
											<Breadcrumb.Item active>
												{t('app:allTopics')}
											</Breadcrumb.Item>
										)}
									</Breadcrumb>
								)}
							</Col>
						</Row>
						<Row>
							<Col ref={categoriesRef} xs={12} md={12} lg={12}>
								{categoryLoading && !categoryTopics.length ? (
									<Loading />
								) : categoryTopics.length ? (
									<Row>
										{categoryTopics.map((topic, topicIndex) => (
											<Col xs={12} sm={6} md={4} lg={4} key={topicIndex}>
												<Card as={Link} to={`/topics/${topic.slug}`}>
													<Card.Img
														src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
													/>
													<Card.Body>
														<Card.Title>{topic.title}</Card.Title>
														<Card.Text>{topic.description}</Card.Text>
													</Card.Body>
												</Card>
											</Col>
										))}
									</Row>
								) : (
									<h4 className='text-center'>{t('app:noData')}</h4>
								)}
								{totalPages > 0 && (
									<Pagination
										totalPages={totalPages}
										currentPage={paginator.pageNumber}
										prevNex
										threeDots
										circle
										size='sm'
										onClick={onPageChange}
									/>
								)}
							</Col>
						</Row>
					</Col>
					<Col xs={12} md={3} lg={3} style={bgStyles.bgPrimary}>
						<RecentTopics />
						<Card>
							<Card.Img src={topicImg} />
						</Card>
					</Col>
				</Row>
			</Container>
		</Page>
	);
};
export default ViwTopics;
