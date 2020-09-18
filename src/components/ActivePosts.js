import React, { useEffect, useState } from 'react';
import { fromString } from 'html-to-text';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardTopics, updateTopic } from '../redux/actions/topics';
import { Loading, ActionButtons } from './common';
import { truncate, formatDate } from '../utils/constants';
import { ActionConfirm } from './models';

export const ActivePosts = ({ history }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({ title: 'title' });
  const [btnAction, setBtnAction] = useState('');
  const pageSize = 3;
  const {
    dashboard: { topicsLoading, topics },
    oneTopic: { topicUpdated }
  } = useSelector(({ dashboard, oneTopic }) => ({
    dashboard,
    oneTopic
  }));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (topicUpdated) {
      setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicUpdated]);
  useEffect(() => {
    getDashboardTopics(currentPage, pageSize);
  }, [currentPage, topicUpdated]);
  const onChangePaginate = (action) => {
    let currentLocation =
      action === 'next'
        ? currentPage + 1
        : currentPage === 1
        ? 1
        : currentPage - 1;
    setCurrentPage(currentLocation);
  };
  const prevDisabled = currentPage === 1 ? 'disabled' : '';
  const nextDisabled = !topics.length ? 'disabled' : '';
  const onTopicSetCurrent = (theTopic, action) => {
    setCurrentTopic(theTopic);
    setBtnAction(action);
    setShow(true);
  };
  return (
    <>
      <ActionConfirm
        title='COnfirm the action'
        description={currentTopic.title}
        show={show}
        action={btnAction}
        onHide={() => setShow(false)}
        onAction={() =>
          dispatch(
            updateTopic(
              { isPublished: !currentTopic.isPublished },
              currentTopic.slug
            )
          )
        }
      />
      <div className='recent-updates card'>
        <div className='card-header'>
          <h3 className='h4'>Recent Updates</h3>
        </div>
        <div className='card-body no-padding'>
          {topicsLoading ? (
            <Loading />
          ) : topics.length ? (
            topics.map((topic, topicIndex) => (
              <div
                className='item d-flex justify-content-between'
                key={topicIndex}
              >
                <div className='info d-flex'>
                  <div className='icon'>
                    <i className='icon-rss-feed'></i>
                  </div>
                  <div className='title'>
                    <h5>{topic.title}</h5>
                    <p>
                      {truncate(
                        fromString(topic.content, { wordwrap: 130 }),
                        200
                      )}
                      <h6>{topic.views.length} views</h6>
                    </p>
                    <ActionButtons
                      onDelete={() => onTopicSetCurrent(topic, 'delete')}
                      status={topic.isPublished ? 'Unpublish' : 'Publish'}
                      onEdit={() =>
                        history.push(`/admin/edit-topic/${topic.slug}`)
                      }
                      onPublish={() =>
                        onTopicSetCurrent(
                          topic,
                          topic.isPublished ? 'unpublish' : 'publish'
                        )
                      }
                      isTopic
                    />
                  </div>
                </div>
                <div className='date text-right'>
                  <span>{formatDate(topic.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <h6 className='text-info text-center'>No published topics</h6>
          )}
        </div>
        <div className='card-footer no-padding'>
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
        </div>
      </div>
    </>
  );
};
