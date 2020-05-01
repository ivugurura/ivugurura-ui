import React, { Fragment } from 'react';
import VideoPlayer from 'react-player';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { SampleTopics, Audio, Communique } from '../components/common';

// const ytbImg = `${process.env.PUBLIC_URL}/yt-img.png`;
const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const Home = () => {
  return (
    <Fragment>
      <Communique />
      <Container fluid>
        <Row>
          <Col md={6} lg={6} xs={12}>
            <Carousel>
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <img
                    className='d-block w-100'
                    src={topicImg}
                    alt={`Slider ${item}`}
                  />
                  <h3>Topic title {item}</h3>
                  <p>
                    {item} Some quick example text to build on the card title
                    and make up the bulk of the card's content...
                  </p>
                </div>
              ))}
            </Carousel>
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
              <Audio />
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
