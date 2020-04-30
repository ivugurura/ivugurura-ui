import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { CardCounter } from '../components/common';
import { ActivePosts, DraftPosts } from '../components';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <Container className='mt-3' fluid>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <CardCounter count={17} title='Published' color='success' />
        </Col>
        <Col xs={12} md={3} lg={3}>
          <CardCounter count={4} title='Draft' color='info' />
        </Col>
        <Col xs={12} md={3} lg={3}>
          <CardCounter count={67} title='Videos' color='primary' />
        </Col>
        <Col xs={12} md={3} lg={3}>
          <CardCounter count={71} title='Audios' color='danger' />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} lg={6}>
          <ActivePosts />
        </Col>
        <Col xs={12} md={6} lg={6}>
          <Container fluid className='mt-3'>
            <Link to='/admin/add-topic' className='btn btn-primary'>
              Add new post
            </Link>
            <Button>Add media</Button>
            <Card className='mt-2'>
              <DraftPosts />
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
