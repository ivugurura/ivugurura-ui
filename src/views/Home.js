import React, { Fragment, useState } from 'react';
import VideoPlayer from 'react-player';
// import AudioPlayer from 'react-audioplayer';
import { Container, Row, Card, Col, Carousel } from 'react-bootstrap';
import { SampleTopics, Audio } from '../components/common';

const ytbImg = `${process.env.PUBLIC_URL}/yt-img.png`;
const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const Home = () => {
  const [topicIndex, setTopicIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setTopicIndex(selectedIndex);
  };
  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col md={6} lg={6} xs={12}>
            <Carousel activeIndex={topicIndex} onSelect={handleSelect}>
              {[1, 2, 3].map((item) => (
                <Carousel.Item key={item}>
                  <img
                    className='d-block w-100'
                    src={topicImg}
                    alt={`Slider ${item}`}
                  />
                  <Carousel.Caption>
                    <h3>Topic title {item}</h3>
                    <p>
                      {item} Some quick example text to build on the card title
                      and make up the bulk of the card's content...
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
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
              {/* <AudioPlayer
                playlist={[
                  {
                    src:
                      'https://studio18.radiolize.com/radio/8220/radio.mp3?1587915754',
                    name: 'Song',
                  },
                ]}
              /> */}
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
