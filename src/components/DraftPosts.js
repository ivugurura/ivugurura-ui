import React, { useState, useEffect } from 'react';
import HtmlParser from 'react-html-parser';
import { Card, Media } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardTopics } from '../redux/actions/topics';
import { Loading } from './common';
import { truncate } from '../utils/constants';

export const DraftPosts = () => {
  const dispatch = useDispatch();
  const topicType = 'unPublished';
  const pageSize = 2;
  const { unPublished, unPublishedLoading } = useSelector(
    ({ dashboard }) => dashboard
  );
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getDashboardTopics(topicType, currentPage, pageSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, getDashboardTopics]);
  const onChangePaginate = (action) => {
    let currentLocation = action === 'next' ? currentPage + 1 : currentPage - 1;
    setCurrentPage(currentLocation);
  };
  const prevDisabled = currentPage === 1 ? 'disabled' : '';
  const nextDisabled = !unPublished.length ? 'disabled' : '';
  return (
    <Card>
      <Card.Header>
        <Card.Title>UNPUBLISHED POST</Card.Title>
      </Card.Header>
      <Card.Body>
        {unPublishedLoading ? (
          <Loading />
        ) : unPublished.length ? (
          unPublished.map((topic, indexTopic) => (
            <Media key={indexTopic}>
              <img
                width={64}
                height={100}
                className='img-thumbnail'
                src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
                alt='Generic placeholder'
              />
              <Media.Body>
                <p>
                  <b>{topic.title}</b>
                </p>
                {HtmlParser(truncate(topic.content, 150))}
                <hr />
              </Media.Body>
            </Media>
          ))
        ) : (
          <h4 className='text-center'>No data to display</h4>
        )}
      </Card.Body>
      <Card.Footer>
        {unPublished.length ? (
          <nav aria-label='Page navigation example'>
            <ul className='pagination justify-content-end'>
              <li
                className={`page-item ${prevDisabled}`}
                onClick={() => onChangePaginate('prev')}
              >
                <button className='page-link btn-link'>Previous</button>
              </li>
              <li
                onClick={() => onChangePaginate('next')}
                className={`page-item ${nextDisabled}`}
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
