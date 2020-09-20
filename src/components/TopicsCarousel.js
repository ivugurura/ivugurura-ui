import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTopics } from '../redux/actions/topics';
import { Loading } from './common';
import { Carousel } from 'react-bootstrap';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const TopicsCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const topic = useSelector(({ topic }) => topic);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopics({ page: 1, pageSize: 3, category: 'carsoul' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTopics]);
  const { carsoulLoading, carsoulTopics } = topic;
  return (
    <>
      {carsoulLoading ? (
        <Loading message='Loading, please wait...' />
      ) : (
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {carsoulTopics.length ? (
            carsoulTopics.map((topic, topicIndex) => (
              <Carousel.Item key={topicIndex}>
                <img
                  className='d-block w-100'
                  src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
                  alt={`Slider ${topicIndex}`}
                />
                <Carousel.Caption>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}...</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <img className='d-block w-100' src={topicImg} alt='Reformors' />
          )}
        </Carousel>
      )}
    </>
  );
};
