import React, { useEffect, useState } from 'react';
import { fromString } from 'html-to-text';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardTopics, updateTopic } from '../redux/actions/topics';
import { Loading, ActionButtons } from './common';
import { truncate, formatDate } from '../utils/constants';
import { ActionConfirm } from './models';
import { Card, Table } from 'react-bootstrap';

export const ActivePosts = ({ history }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({ title: 'title' });
  const [btnAction, setBtnAction] = useState('');
  const pageSize = 10;
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
      <Card>
        <Card.Header as='h4'>Recent Updates</Card.Header>
        <Card.Body>
          {topicsLoading ? (
            <Loading />
          ) : topics.length ? (
            <Table responsive='sm'>
              <thead>
                <tr>
                  <th></th>
                  <th>Topic title</th>
                  <th>Simple description</th>
                  <th>View</th>
                  <th>Published at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic, topicIdx) => (
                  <tr key={topicIdx}>
                    <td>
                      <div className='icon'>
                        <i className='icon-rss-feed'></i>
                      </div>
                    </td>
                    <td>{topic.title}</td>
                    <td>{truncate(fromString(topic.content), 200)}</td>
                    <td>{topic.views.length} views</td>
                    <td>{formatDate(topic.createdAt)}</td>
                    <td>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h6 className='text-info text-center'>No published topics</h6>
          )}
        </Card.Body>
        <Card.Footer>
          <nav aria-label='Page navigation example'>
            <ul className='pagination justify-content-end'>
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onChangePaginate('prev')}
              >
                <button className='page-link btn-link'>Previous</button>
              </li>
              <li
                onClick={() => onChangePaginate('next')}
                className={`page-item ${!topics.length ? 'disabled' : ''}`}
              >
                <button className='page-link btn-link'>Next</button>
              </li>
            </ul>
          </nav>
        </Card.Footer>
      </Card>
    </>
  );
};
