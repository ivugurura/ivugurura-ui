import React, { useEffect } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import Carousel from '@brainhubeu/react-carousel';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import '@brainhubeu/react-carousel/lib/style.css';
import { bgStyles, textStyles } from '../../utils/styles';
import { Link } from 'react-router-dom';
import { translate } from '../utils';
import { useSelector } from 'react-redux';
import { getTopics } from '../../redux/actions/topics';
import { Loading } from './Loading';
import { truncate } from '../../utils/constants';

export const SampleTopics = ({ isHomePage, topics, loading }) => {
	let componentTopics = topics || [];
	let componentLoading = loading || false;

	const topic = useSelector(({ topic }) => topic);
	useEffect(() => {
		if (isHomePage) {
			getTopics({ page: 1, pageSize: 10, category: 'recent' });
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
			animationSpeed: 3000,
			infinite: false
		}
	};
	return (
		<Card>
			{isHomePage ? (
				<Card.Header style={bgStyles.bgPrimary} className='text-center'>
					<h1 style={textStyles.textTransparent}>
						{translate('mostReadTopics')}
					</h1>
					<Card.Link style={textStyles.textTransparent}>
						{translate('radioMsg')}
					</Card.Link>
				</Card.Header>
			) : (
				<h3 className='text-center'>{translate('relatedTopics')}</h3>
			)}
			<Card.Body className='text-center'>
				{componentLoading ? (
					<Loading message='Please wait' />
				) : componentTopics.length ? (
					<Carousel
						slidesPerPage={4}
						autoPlay={5000}
						slidesPerScroll={3}
						stopAutoPlayOnHover
						infinite
						arrows
						breakpoints={carsoulBreakpoints}
					>
						{componentTopics.map((topic, topicItem) => (
							<Col key={topicItem} xs={12} md={12} lg={12}>
								<Link to={`/topics/${topic.slug}`}>
									<Card style={{ height: '50vh' }}>
										<Card.Img
											variant='top'
											src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
										/>
										<Card.Body>
											<Card.Title>{topic.title}</Card.Title>
											<Card.Text>{truncate(topic.description, 80)}</Card.Text>
										</Card.Body>
									</Card>
								</Link>
							</Col>
						))}
					</Carousel>
				) : null}
				<Button as={Link} to='/topics'>
					View more
				</Button>
			</Card.Body>
		</Card>
	);
};
