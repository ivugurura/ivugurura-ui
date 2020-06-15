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
  const topicType = 'published';
  const pageSize = 3;
  const { dashboard, oneTopic } = useSelector(({ dashboard, oneTopic }) => ({
    dashboard,
    oneTopic,
  }));
  const { published, publishedLoading } = dashboard;
  const { topicUpdated } = oneTopic;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getDashboardTopics(topicType, currentPage, pageSize));
    if (topicUpdated) {
      setShow(false);
      dispatch(getDashboardTopics(topicType, currentPage, pageSize));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, getDashboardTopics, topicUpdated]);

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
  const nextDisabled = !published.length ? 'disabled' : '';
  const onTopicSetCurrent = (theTopic, action) => {
    setCurrentTopic(theTopic);
    setBtnAction(action);
    setShow(true);
  };
  return (
    <>
      <ActionConfirm
        title='Action modal'
        description={currentTopic.title}
        show={show}
        action={btnAction}
        onHide={() => setShow(false)}
        onAction={() =>
          dispatch(updateTopic({ isPublished: false }, currentTopic.slug))
        }
      />
      <div className='recent-updates card'>
        <div className='card-header'>
          <h3 className='h4'>Recent Updates</h3>
        </div>
        <div className='card-body no-padding'>
          {publishedLoading ? (
            <Loading />
          ) : published.length ? (
            published.map((topic, topicIndex) => (
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
                        fromString(topic.content, { wordwrap: 70 }),
                        120
                      )}
                    </p>
                    <ActionButtons
                      onDelete={() => onTopicSetCurrent(topic, 'delete')}
                      status={topic.isPublished ? 'Unpublish' : 'Publish'}
                      onEdit={() =>
                        history.push(`/admin/edit-topic/${topic.slug}`)
                      }
                      onPublish={() => onTopicSetCurrent(topic, 'unpublish')}
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
