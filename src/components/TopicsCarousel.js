import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { getTopics } from '../redux/actions/topics';
import { Loading } from './common';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const TopicsCarousel = () => {
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
