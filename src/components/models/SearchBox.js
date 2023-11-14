import React, { useState, useEffect } from 'react';
import { Modal, Media, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { searchQuery } from '../../redux/actions';
import { Loading } from '../common';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { systemLanguage } from '../../utils/constants';

export const SearchBox = ({ show, onHide }) => {
	const { t } = useTranslation();
	const [searchVal, setSearchVal] = useState('');
	const { searching, finished, results } = useSelector(({ search }) => search);
	useEffect(() => {
		if (searchVal) {
			searchQuery(searchVal);
		}
	}, [searchVal]);
	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>{t('app:searchTitle')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control
					value={searchVal}
					autoFocus={true}
					placeholder={t('app:searchPHolder')}
					onChange={({ target }) => setSearchVal(target.value)}
				/>
				<div>
					{searching ? (
						<Loading />
					) : finished && (
						<>
							<div>
								<hr />
								{results.categories?.map((category, categoryIndex) => (
											<Media.Body key={categoryIndex}>
												<Link
													to={`/${systemLanguage}/topics/categories/${category.slug}`}
													onClick={onHide}
												>
													<h6>{category.name}</h6>
												</Link>
											</Media.Body>
									  ))
									}
							</div>
							<div>
								<hr />
								{results.topics?.map((topic, topicIndex) => (
											<Link
												key={topicIndex}
												to={`/${systemLanguage}/topics/${topic.slug}`}
												onClick={onHide}
											>
												<Media.Body>
													<h6>{topic.title}</h6>
													<p>{topic.description}</p>
												</Media.Body>
											</Link>
									  ))
									}
							</div>
						</>
					)}
				</div>
			</Modal.Body>
		</Modal>
	);
};
