import React, { Fragment } from 'react';
import { Navbar, Container, Row, Col, Card, Media } from 'react-bootstrap';
import { bgStyles } from '../utils/styles';
import { Logo, Footer, CardCounter } from '../components/common';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const Dashboard = () => {
  return (
    <Fragment>
      <Navbar style={bgStyles.bgPrimary}>
        <Logo />
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'></Navbar.Collapse>
      </Navbar>
      <Container className='mt-3'>
        <Row>
          <Col xs={6} md={3} lg={3}>
            <CardCounter />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Card>
              <Card.Header>
                <Card.Title>ACTIVE POSTS</Card.Title>
              </Card.Header>
              <Card.Body>
                <Media>
                  <img
                    width={64}
                    height={100}
                    className='img-thumbnail'
                    src={topicImg}
                    alt='Generic placeholder'
                  />
                  <Media.Body>
                    <b>Media Heading</b>
                    <p>
                      Donec sed odio dui. Nullam quis risus eget urna mollis
                      ornare vel eu leo. Cum sociis natoque penatibus
                    </p>
                    <hr />
                  </Media.Body>
                </Media>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={6}></Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};
