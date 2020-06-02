import React, { Fragment, useEffect } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import HtmlParser from 'react-html-parser';
import {
  RecentTopics,
  SampleTopics,
  Communique,
  Loading,
} from '../components/common';
import { bgStyles } from '../utils/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getTopicDetail } from '../redux/actions/topics';
import { CommentaryForm } from '../components';
import { formatDate } from '../utils/constants';
import { translate } from '../components/utils';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const TopicView = ({ match, history }) => {
  const { topicSlug } = match.params;
  const { oneTopic, user } = useSelector(({ oneTopic, user }) => ({
    oneTopic,
    user,
  }));
  const { topic, topicLoading } = oneTopic;
  const { isAuthenticated } = user;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopicDetail(topicSlug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicSlug, getTopicDetail]);
  const relatedTopics = topic.category ? topic.category.relatedTopics : [];
  return (
    <Fragment>
      <Communique />
      <Container fluid>
        <Row>
          <Col xs={12} md={9} lg={9}>
            {topicLoading ? (
              <Loading />
            ) : (
              <>
                <Card.Title>{topic.title}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  <h6>
                    {translate('createdAt')} {`${formatDate(topic.createdAt)}`}
                  </h6>
                </Card.Subtitle>
                <Card>
                  <Card.Img
                    variant='top'
                    src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
                    alt={topic.description}
                  />
                  <Card.Body>
                    {HtmlParser(topic.content)}
                    {isAuthenticated ? null : null}
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
      <SampleTopics loading={topicLoading} topics={relatedTopics} />
    </Fragment>
  );
};
