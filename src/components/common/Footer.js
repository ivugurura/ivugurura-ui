import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { bgStyles, textStyles } from '../../utils/styles';
import { RecentTopics } from './RecentTopics';
import { useSelector } from 'react-redux';
import { ContactForm } from '../ContactForm';
import { Link } from 'react-router-dom';
import { systemLanguages } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const currentYear = new Date().getFullYear();
export const Footer = ({ isHomepage }) => {
	const { t } = useTranslation();
	const [subCategories, setSubCategories] = useState([]);
	const { navCategories } = useSelector(({ category }) => category);
	return (
		<footer>
			{isHomepage ? (
				<Card style={bgStyles.bgPrimary}>
					<Container style={textStyles.textTransparent} className='mt-4'>
						<Row>
							<Col xs={12} md={4} lg={4}>
								<Card.Body>
									<Card.Title style={textStyles.textFtTitle}>
										{t('app:writingsCat')}
									</Card.Title>
									<Form.Control
										size='lg'
										as='select'
										name='category'
										onChange={({ target }) =>
											setSubCategories(navCategories[target.value].categories)
										}
									>
										<option value=''>--------</option>
										{navCategories.map((category, categoryIndex) => (
											<option key={categoryIndex} value={categoryIndex}>
												{category.name}
											</option>
										))}
									</Form.Control>
									{subCategories.map((item, itemIndex) => (
										<Card.Header>
											<Link
												key={itemIndex}
												to={`/topics/categories/${item.slug}`}
											>
												<h4>{item.name}</h4>
											</Link>
										</Card.Header>
									))}
								</Card.Body>
							</Col>
							<Col xs={12} md={4} lg={4}>
								<ContactForm />
							</Col>
							<Col xs={12} md={4} lg={4}>
								<RecentTopics />
							</Col>
						</Row>
					</Container>
				</Card>
			) : null}

			<Card style={bgStyles.bgPrimary} className='mt-2'>
				<Card.Body style={textStyles.textTransparent}>
					<Row>
						<Col xs={12} md={4} lg={4}>
							{`@Copyright 2016-${currentYear}, `}
							<span>{t('app:title')}</span>
						</Col>
						<Col xs={12} md={4} lg={4}>
							Tel:+250 788 476 743
						</Col>
						<Col xs={12} md={4} lg={4}>
							{systemLanguages.map(({ lang }, langIdx) => (
								<span key={langIdx}>
									{lang}
									{langIdx !== systemLanguages.length - 1 ? ' |' : null}
								</span>
							))}
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</footer>
	);
};
