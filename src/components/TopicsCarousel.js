import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTopics } from '../redux/actions/topics';
import { Loading } from './common';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMAGE_PATH, systemLanguage } from 'utils/constants';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const TopicsCarousel = () => {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	const { carsoulLoading, carsoulTopics } = useSelector(({ topic }) => topic);
	useEffect(() => {
		getTopics({ page: 1, pageSize: 6, category: 'carsoul' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{carsoulLoading ? (
				<Loading message='Loading, please wait...' />
			) : (
				<Carousel activeIndex={index} onSelect={handleSelect}>
					{carsoulTopics.length ? (
						carsoulTopics.map((topic, topicIndex) => (
							<Carousel.Item
								key={topicIndex}
								as={Link}
								to={`/${systemLanguage}/topics/${topic.slug}`}
								style={{ height: '64vh' }}
							>
								<img
									className='d-block w-100'
									style={{ height: '100%' }}
									src={`${IMAGE_PATH}/${topic.coverImage}`}
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
