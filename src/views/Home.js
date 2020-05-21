import React, { Fragment } from 'react';
import VideoPlayer from 'react-player';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { SampleTopics, Audio, Communique } from '../components/common';
import { translate } from '../components/utils';
import { Radio, TopicsCarousel } from '../components';
import { textStyles, bgStyles } from '../utils/styles';

// const ytbImg = `${process.env.PUBLIC_URL}/yt-img.png`;
export const Home = () => {
  return (
    <Fragment>
      <Communique />
      <Container fluid>
        <Row>
          <Col md={6} lg={6} xs={12}>
            <TopicsCarousel />
          </Col>
          <Col md={6} lg={6} xs={12}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <h4 className='text-center'>{translate('radioName')}</h4>
                <h6>{translate('listen')}</h6>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Radio />
              </Col>
              <Col xs={12} sm={12} md={12}>
                <VideoPlayer
                  url='https://www.youtube.com/watch?v=45KCx3YrSKU'
                  playing={false}
                  width='100%'
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <SampleTopics isHomePage topics={[]} loading={false} />
      <Card>
        <Card.Header className='text-center' style={bgStyles.bgPrimary}>
          <h1 style={textStyles.textTransparent}>
            {translate('audioVideoTxt')}
          </h1>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <Audio />
            </Col>
            <Col xs={12} md={8} lg={8}>
              <VideoPlayer
                url='https://www.youtube.com/watch?v=jvZy1emoFV0'
                playing={false}
                width='100%'
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
