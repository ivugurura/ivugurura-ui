import React, { useEffect, useRef } from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	Breadcrumb,
	Pagination
} from 'react-bootstrap';
import { RecentTopics, Communique, Loading } from '../components/common';
import { bgStyles } from '../utils/styles';
import { useSelector } from 'react-redux';
import { getCategoryDetail, getTopics } from '../redux/actions';
import { Link } from 'react-router-dom';
import { scrollToRef } from '../utils/constants';
import { Page } from '../components';
import { useTranslation } from 'react-i18next';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const ViwTopics = ({ match }) => {
	const categoriesRef = useRef(null);
	const { t } = useTranslation();
	const { categorySlug } = match.params;
	const {
		topic: { categoryLoading, categoryTopics },
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
		if (categorySlug && category.id) {
			getTopics({ page: 1, pageSize: 20, category: category.id });
		} else if (!categorySlug) {
			getTopics({ page: 1, pageSize: 20 });
		}
	}, [categorySlug, category.id]);
	return (
		<Page title={category.name || t('app:topics')}>
			<Communique />
			<Container fluid>
				<Row>
					<Col xs={12} md={9} lg={9}>
						{categoryFetching ? (
							<Loading />
						) : (
							<Breadcrumb>
								<Breadcrumb.Item>{t('app:topics')}</Breadcrumb.Item>
								{category.slug ? (
									<>
										<Breadcrumb.Item>{category.parent.name}</Breadcrumb.Item>
										<Breadcrumb.Item active>{category.name}</Breadcrumb.Item>
									</>
								) : (
									<Breadcrumb.Item active>{t('app:allTopics')}</Breadcrumb.Item>
								)}
							</Breadcrumb>
						)}
						<div className='card-columns' ref={categoriesRef}>
							{categoryLoading ? (
								<Loading />
							) : categoryTopics.length ? (
								<>
									{categoryTopics.map((topic, topicIndex) => (
										<Link key={topicIndex} to={`/topics/${topic.slug}`}>
											<Card>
												<Card.Img
													src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
												/>
												<Card.Body>
													<Card.Title>{topic.title}</Card.Title>
													<Card.Text>{topic.description}</Card.Text>
												</Card.Body>
											</Card>
										</Link>
									))}
								</>
							) : (
								<h4 className='text-center'>{category.name}</h4>
							)}
						</div>
						<Pagination size='sm'>
							<Pagination.First>First page</Pagination.First>
							<Pagination.Prev />
							<Pagination.Next />
						</Pagination>
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
