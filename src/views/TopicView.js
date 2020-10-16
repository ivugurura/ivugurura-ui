import React, { useEffect, useRef } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import HtmlParser from 'react-html-parser';
import {
	RecentTopics,
	SampleTopics,
	Communique,
	Loading
} from '../components/common';
import { bgStyles } from '../utils/styles';
import { useSelector } from 'react-redux';
import { getTopicDetail } from '../redux/actions/topics';
import { CommentaryForm, Comments, Page } from '../components';
import { formatDate, scrollToRef } from '../utils/constants';
import { translate } from '../components/utils';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
const TopicView = ({ match }) => {
	const topicRef = useRef(null);

	const { topicSlug } = match.params;
	const { topic, loading } = useSelector(({ topicGet }) => topicGet);
	useEffect(() => {
		getTopicDetail(topicSlug);
		scrollToRef(topicRef);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [topicSlug]);

	return (
		<Page title={topic.title || ''}>
			<Communique />
			<Container fluid>
				<Row>
					<Col xs={12} md={9} lg={9}>
						{loading ? (
							<Loading />
						) : (
							<>
								<Card.Title>{topic.title}</Card.Title>
								<Card.Subtitle className='mb-2 text-muted'>
									<h6>
										{translate('createdAt')} {`${formatDate(topic.createdAt)}`}
									</h6>
								</Card.Subtitle>
								<Card ref={topicRef}>
									<Card.Img
										variant='top'
										src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
										alt={topic.description}
									/>
									<Card.Body>
										{HtmlParser(topic.content)}
										<Comments slug={topicSlug} />
									</Card.Body>
									<Card.Footer>
										<CommentaryForm slug={topicSlug} />
									</Card.Footer>
								</Card>
							</>
						)}
					</Col>
					<Col xs={12} md={3} lg={3} style={bgStyles.bgPrimary}>
						<RecentTopics />
						<Card>
							<Card.Img src={topicImg} />
						</Card>
					</Col>
				</Row>
			</Container>
			<SampleTopics loading={loading} topics={topic.category.relatedTopics} />
		</Page>
	);
};
export default TopicView;
