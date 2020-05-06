import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { getCarsoulTopics } from '../redux/actions/topics';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const TopicsCarousel = () => {
  const topic = useSelector(({ topic }) => topic);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarsoulTopics({ page: 1, pageSize: 3 }));
  }, [getCarsoulTopics]);
  console.log(topic);

  return (
    <Carousel autoPlay infiniteLoop stopOnHover>
      {[1, 2, 3].map((item) => (
        <div key={item}>
          <img
            className='d-block w-100'
            src={topicImg}
            alt={`Slider ${item}`}
          />
          <h3>Topic title {item}</h3>
          <p>
            {item} Some quick example text to build on the card title and make
            up the bulk of the card's content...
          </p>
        </div>
      ))}
    </Carousel>
  );
};
