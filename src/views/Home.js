import React, { Fragment } from 'react';
import VideoPlayer from 'react-player';
import AudioPlayer from 'react-audio-player';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { SampleTopics } from '../components/common';

const ytbImg = `${process.env.PUBLIC_URL}/yt-img.png`;
export const Home = () => {
  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col md={6} lg={6} xs={12}>
            <Card>
              <Card.Img variant='top' src={ytbImg} />
            </Card>
          </Col>
          <Col md={6} lg={6} xs={12}>
            <Card>
              <VideoPlayer url='' playing={false} width='100%' />
            </Card>
          </Col>
        </Row>
      </Container>
      <SampleTopics isHomePage />
      <Card>
        <Card.Header className='text-center'>
          <h1>Indirimbo na video z Abagorozi</h1>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <AudioPlayer src='' controls />
            </Col>
            <Col xs={12} md={8} lg={8}>
              <VideoPlayer url='' playing={false} width='100%' />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
