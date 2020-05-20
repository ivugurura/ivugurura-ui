import React, { useEffect, useState } from 'react';
import { Card, Media, Row, Col, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardTopics } from '../redux/actions/topics';
import { Loading } from './common';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const AdminPosts = ({ isPublished }) => {
  const topicsType = isPublished ? 'published' : 'unPublished';
  const pageSize = isPublished ? 3 : 2;
  const dispatch = useDispatch();
  const {
    published,
    publishedLoading,
    unPublished,
    unPublishedLoading,
  } = useSelector(({ dashboard }) => dashboard);
  const [publishPage, setPublishPage] = useState(1);
  const [unPublishPage, setUnPublishPage] = useState(1);
  const currentPage = isPublished ? publishPage : unPublishPage;

  useEffect(() => {
    dispatch(getDashboardTopics('published', publishPage, 3));
    dispatch(getDashboardTopics('unPublished', unPublishPage, 2));
  }, [publishPage, unPublishPage, getDashboardTopics]);

  const topics = isPublished ? published : unPublished;
  const fetchLoading = isPublished ? publishedLoading : unPublishedLoading;
  const onChangePaginate = (page, action) => {
    const currentLocation = action === 'next' ? page++ : page--;
    if (isPublished) {
      setPublishPage(currentLocation);
    } else {
      setUnPublishPage(currentLocation);
    }
    const thePage = isPublished ? publishPage : unPublishPage;
    dispatch(getDashboardTopics(topicsType, thePage, 1));
    console.log('Paginate', page);
  };
  const prevDisabled = currentPage === 1 ? 'disabled' : '';
  const nextDisabled = !topics.length ? 'disabled' : '';
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {isPublished ? 'ACTIVE POST' : 'UNPUBLISHED POST'}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {fetchLoading ? (
          <Loading />
        ) : topics.length ? (
          topics.map((topic, indexTopic) => (
            <Media key={indexTopic}>
              <img
                width={64}
                height={100}
                className='img-thumbnail'
                src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
                alt='Generic placeholder'
              />
              <Media.Body>
                <b>{topic.title}</b>
                <p>{topic.description}</p>
                <hr />
              </Media.Body>
            </Media>
          ))
        ) : (
          <h4 className='text-center'>No data to display</h4>
        )}
      </Card.Body>
      <Card.Footer>
        {topics.length ? (
          <nav aria-label='Page navigation example'>
            <ul className='pagination justify-content-end'>
              <li className={`page-item ${prevDisabled}`}>
                <button className='page-link btn-link'>Previous</button>
              </li>
              <li
                className={`page-item ${nextDisabled}`}
                onClick={() => onChangePaginate(currentPage, 'next')}
              >
                <button className='page-link btn-link'>Next</button>
              </li>
            </ul>
          </nav>
        ) : null}
      </Card.Footer>
    </Card>
  );
};
