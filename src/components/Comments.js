import React, { useEffect } from 'react';
import '../styles/topicsComments.css';
import { useSelector, useDispatch } from 'react-redux';
import { getTopicsComments } from '../redux/actions';
import { Loading } from './common';
import { formatDate } from '../utils/constants';

export const Comments = ({ slug }) => {
  //   const { commentsFetching, comments } = useSelector(
  //     ({ topicComments }) => topicComments
  //   );
  const { topicComments, comment } = useSelector(
    ({ topicComments, comment }) => ({
      topicComments,
      comment,
    })
  );
  const { commentsFetching, comments } = topicComments;
  const { commentAdded } = comment;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopicsComments(slug));
  }, [dispatch, slug, commentAdded]);
  return (
    <div>
      {commentsFetching ? (
        <Loading />
      ) : comments.length ? (
        <>
          <h4>Commentaries</h4>
          <ul class='timeline'>
            {comments.map((comment, commentIndex) => (
              <li key={commentIndex}>
                <strong>{comment.names}</strong>
                <i class='float-right'>{formatDate(comment.createdAt)}</i>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
