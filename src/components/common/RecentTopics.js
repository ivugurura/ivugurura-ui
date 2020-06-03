import React, { useEffect } from 'react';
import { Media, Card } from 'react-bootstrap';
import { textStyles } from '../../utils/styles';
import { translate } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { getTopics } from '../../redux/actions';
import { Loading } from './Loading';
import { formatDate } from '../../utils/constants';

export const RecentTopics = () => {
  const dispatch = useDispatch();
  const { recentLoading, recentTopics } = useSelector(({ topic }) => topic);
  useEffect(() => {
    dispatch(getTopics({ page: 1, pageSize: 3, category: 'recent' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTopics]);
  return (
    <Card.Body style={textStyles.textTransparent}>
      <Card.Title style={textStyles.textFtTitle}>
        {translate('recentTopics')}
      </Card.Title>
      {recentLoading ? (
        <Loading />
      ) : recentTopics.length ? (
        recentTopics.map((topic, topicIndex) => (
          <Media.Body key={topicIndex}>
            <h6>{topic.title}</h6>
            <p>{formatDate(topic.createdAt)}</p>
          </Media.Body>
        ))
      ) : (
        <h4>No topics</h4>
      )}
    </Card.Body>
  );
};
