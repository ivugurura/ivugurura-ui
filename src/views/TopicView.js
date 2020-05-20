import React, { Fragment, useEffect } from 'react';
import { Row, Col, Container, Card, Form } from 'react-bootstrap';
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

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const TopicView = ({ match }) => {
  const { topicSlug } = match.params;
  const { topic, topicLoading } = useSelector(({ oneTopic }) => oneTopic);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopicDetail(topicSlug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTopicDetail]);
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
                  {topic.createdAt}
                </Card.Subtitle>
                <Card>
                  <Card.Img
                    variant='top'
                    src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
                  />
                  <Card.Body>{HtmlParser(topic.content)}</Card.Body>
                  <Card.Footer>
                    <Form.Control as='textarea' rows='3' />
                    <Form.Row className='mt-2'>
                      <Form.Group
                        as={Col}
                        md='4'
                        controlId='validationFormik01'
                      >
                        <Form.Control type='text' name='firstName' />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md='4'
                        controlId='validationFormik02'
                      >
                        <Form.Control type='text' name='lastName' />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md='4'
                        controlId='validationFormikUsername'
                      >
                        <Form.Control
                          type='text'
                          placeholder='Username'
                          aria-describedby='inputGroupPrepend'
                          name='username'
                        />
                        <Form.Control.Feedback type='invalid'>
                          Error
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
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
