import React from 'react';
import { publishComment } from '../redux/actions';
import { Loading } from './common';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { truncate } from '../utils/constants';

export const Commentaries = ({ loading = false, comments = [] }) => {
  return (
    <div className='card'>
      <div className='card-header d-flex align-items-center'>All comments</div>
      <div className='card-body'>
        <div className='table-responsive'>
          {loading ? (
            <Loading />
          ) : comments.length ? (
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User info</th>
                  <th>Content</th>
                  <th>Topic title</th>
                  <th>Has published</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment, commentIndex) => (
                  <tr key={commentIndex}>
                    <td>{commentIndex + 1}</td>
                    <td>
                      <OverlayTrigger
                        placement='top'
                        overlay={
                          <Popover id={commentIndex}>
                            <Popover.Title as='h3'>
                              {comment.names}
                            </Popover.Title>
                            <Popover.Content>
                              Email: {comment.email}
                              <br />
                              Website: {comment.website}
                            </Popover.Content>
                          </Popover>
                        }
                      >
                        <div>
                          <strong>{comment.names}</strong>
                          <br />
                          {comment.email}
                        </div>
                      </OverlayTrigger>
                    </td>
                    <td>{comment.content}</td>
                    <td>
                      <OverlayTrigger
                        placement='top'
                        overlay={
                          <Popover id={commentIndex}>
                            <Popover.Title as='h3'>
                              {comment.topic.title}
                            </Popover.Title>
                            <Popover.Content>
                              {comment.topic.description}
                            </Popover.Content>
                          </Popover>
                        }
                      >
                        <div>{truncate(comment.topic.title, 30)}</div>
                      </OverlayTrigger>
                    </td>
                    <td>{comment.isPublished ? 'Yes' : 'No'}</td>
                    <td>
                      <Button
                        size='sm'
                        variant={comment.isPublished ? 'danger' : 'primary'}
                        onClick={() => publishComment(comment.id)}
                      >
                        {comment.isPublished ? 'Publish' : 'Unpublish'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className='text-center'>No Commentary found</h5>
          )}
        </div>
      </div>
    </div>
  );
};
