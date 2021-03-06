import React, { useEffect, useRef } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import HtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next';
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
import { AudioPlayer } from '../components/AudioPlayer';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
const Audios = ({ match }) => {
	const { t } = useTranslation();
	return (
		<Page title={t('app:songsAndTopics')}>
			<Communique />
			<Container fluid>
				<Row>
					<Col xs={12} md={8} lg={8}>
						<AudioPlayer trancNumber={20} notOnlyIcon withPaginations />
					</Col>
					<Col xs={12} md={4} lg={4} style={bgStyles.bgPrimary}>
						<RecentTopics />
						<Card>
							<Card.Img src={topicImg} />
						</Card>
					</Col>
				</Row>
			</Container>
			<SampleTopics isHomePage topics={[]} loading={false} />
		</Page>
	);
};
export default Audios;
