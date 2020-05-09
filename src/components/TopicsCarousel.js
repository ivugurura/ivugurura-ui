import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { getCarsoulTopics } from '../redux/actions/topics';
import { Container, Spinner } from 'react-bootstrap';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const TopicsCarousel = () => {
  const topic = useSelector(({ topic }) => topic);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarsoulTopics({ page: 1, pageSize: 3 }));
  }, [getCarsoulTopics]);
  const { carsoulLoading, carsoulTopics } = topic;
  return (
    <>
      {carsoulLoading ? (
        <h1 className='text-center'>
          <Spinner animation='border' />
        </h1>
      ) : (
        <Carousel autoPlay infiniteLoop stopOnHover>
          {carsoulTopics.length ? (
            carsoulTopics.map((topic, topicIndex) => (
              <div key={topicIndex}>
                <img
                  className='d-block w-100'
                  src={topicImg}
                  alt={`Slider ${topicIndex}`}
                />
                <h3>{topic.title}</h3>
                <p>{topic.description}...</p>
              </div>
            ))
          ) : (
            <img className='d-block w-100' src={topicImg} alt='Reformors' />
          )}
        </Carousel>
      )}
    </>
  );
};
