import React, { useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';
import Carousel from '@brainhubeu/react-carousel';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import '@brainhubeu/react-carousel/lib/style.css';
import { bgStyles, textStyles } from '../../utils/styles';
import { Link } from 'react-router-dom';
import { translate } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { getTopics } from '../../redux/actions/topics';
import { Loading } from './Loading';
import { truncate } from '../../utils/constants';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const SampleTopics = ({ isHomePage, topics, loading }) => {
  let componentTopics = topics || [];
  let componentLoading = loading || false;

  const topic = useSelector(({ topic }) => topic);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isHomePage) {
      dispatch(getTopics({ page: 1, pageSize: 3, category: 'recent' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTopics]);
  if (isHomePage) {
    componentTopics = topic.recentTopics;
    componentLoading = topic.recentLoading;
  }
  const carsoulBreakpoints = {
    500: {
      slidesPerPage: 1,
      slidesPerScroll: 1,
      clickToChange: false,
      centered: false,
      arrowLeft: <FaArrowCircleLeft />,
      arrowRight: <FaArrowCircleRight />,
      animationSpeed: 2000,
      infinite: false,
    },
  };
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
        {componentLoading ? (
          <Loading message='Please wait' />
        ) : (
          <Carousel
            slidesPerPage={3}
            autoPlay={5000}
            slidesPerScroll={3}
            stopAutoPlayOnHover
            infinite
            arrows
            breakpoints={carsoulBreakpoints}
          >
            {componentTopics.map((topic, topicItem) => (
              <Col key={topicItem} xs={12} md={12} lg={12}>
                <Link to={`/${topic.slug}/view`}>
                  <Card>
                    <Card.Img variant='top' src={topicImg} />
                    <Card.Body>
                      <Card.Title>{topic.title}</Card.Title>
                      <Card.Text>{truncate(topic.description, 80)}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Carousel>
        )}
      </Card.Body>
    </Card>
  );
};
