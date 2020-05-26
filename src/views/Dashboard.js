import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { CardCounter, Loading } from '../components/common';
import { ActivePosts, DraftPosts } from '../components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboadCount } from '../redux/actions';

export const Dashboard = ({ history }) => {
  const { countLoading, counts } = useSelector(({ dashboard }) => dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboadCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDashboadCount]);
  return (
    <Container className='mt-3' fluid>
      <Row>
        {countLoading ? (
          <Col xs={12} md={12} lg={12}>
            <Loading />
          </Col>
        ) : (
          <>
            <Col xs={12} md={3} lg={3}>
              <CardCounter
                count={counts.published | 0}
                title='Published'
                color='success'
              />
            </Col>
            <Col xs={12} md={3} lg={3}>
              <CardCounter
                count={counts.unPublished | 0}
                title='Draft'
                color='info'
              />
            </Col>
            <Col xs={12} md={3} lg={3}>
              <CardCounter
                count={counts.videos | 0}
                title='Videos'
                color='primary'
              />
            </Col>
            <Col xs={12} md={3} lg={3}>
              <CardCounter
                count={counts.audios | 0}
                title='Audios'
                color='danger'
              />
            </Col>
          </>
        )}
      </Row>
      <Row>
        <Col xs={12} md={6} lg={6}>
          <ActivePosts history={history} />
        </Col>
        <Col xs={12} md={6} lg={6}>
          <Container fluid className='mt-3'>
            <Link to='/admin/add-topic' className='btn btn-primary'>
              Add new post
            </Link>
            <Button>Add media</Button>
            <Card className='mt-2'>
              <DraftPosts history={history} />
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
