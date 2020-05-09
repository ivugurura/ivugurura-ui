import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { bgStyles, textStyles } from '../../utils/styles';
import { Link } from 'react-router-dom';
import { translate } from '../utils';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const SampleTopics = ({ isHomePage }) => {
  return (
    <Card style={bgStyles.bgAccent}>
      {isHomePage ? (
        <Card.Header style={bgStyles.bgPrimary} className='text-center'>
          <h1 style={textStyles.textTransparent}>{translate('radioName')}</h1>
          <Card.Link style={textStyles.textTransparent}>
            {translate('listen')}
          </Card.Link>
        </Card.Header>
      ) : (
        <h1 className='text-center mt-2'>{translate('relatedTopics')}</h1>
      )}
      <Card.Body>
        <Carousel
          slidesPerPage={3}
          autoPlay={5000}
          slidesPerScroll={3}
          stopAutoPlayOnHover
          centered
          arrows
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Col key={item} xs={12} md={12} lg={12}>
              <Link to={`/topic-title-${item}/view`}>
                <Card>
                  <Card.Img variant='top' src={topicImg} />
                  <Card.Body>
                    <Card.Title>Topic title #{item}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content...
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Carousel>
      </Card.Body>
    </Card>
  );
};
