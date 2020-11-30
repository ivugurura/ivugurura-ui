import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles/footer.css';
import { currentYear, socialMedias } from '../../utils/constants';

export const MainFooter = () => {
	const { t } = useTranslation();
	const { navCategories } = useSelector(({ category }) => category);
	return (
		<footer className='mainfooter' role='contentinfo'>
			<div className='footer-middle'>
				<Container>
					<Row>
						<Col lg={10} md={10} sm={12} xs={12}>
							<Row>
								{navCategories.map((category, categoryIdx) => (
									<Col xs={12} sm={12} md={3} lg={3} key={categoryIdx}>
										<div className='footer-pad'>
											<h4>{category.name}</h4>
											<ul className='list-unstyled'>
												{category.categories.map((subCat, subCatIdx) => (
													<Link
														key={subCatIdx}
														to={`/topics/categories/${subCat.slug}`}
													>
														{subCat.name}
													</Link>
												))}
											</ul>
										</div>
									</Col>
								))}
							</Row>
						</Col>
						<Col lg={2} md={2} sm={12} xs={12}>
							<h5>{t('app:followUs')}</h5>
							<ul className='social-network social-circle'>
								{socialMedias.map((social, socialIdx) => (
									<li key={socialIdx}>
										<a
											target='_blank'
											rel='noreferrer'
											href={social.url}
											title={social.name}
										>
											<i className={`fa fa-${social.faIcon}`}></i>
										</a>
									</li>
								))}
							</ul>
						</Col>
					</Row>
					<Row>
						<Col md={12} className='copy'>
							<p className='text-center'>
								&copy; Copyright 2016-{currentYear}, {t('app:title')}. All
								rights reserved.
							</p>
						</Col>
					</Row>
				</Container>
			</div>
		</footer>
	);
};
