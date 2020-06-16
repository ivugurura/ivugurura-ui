import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommuniques, publishCommunique } from '../redux/actions';
import { Loading } from './common';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { truncate } from '../utils/constants';

export const AdminCommuniques = () => {
  const dispatch = useDispatch();
  const { communiqueAdd, communiqueGet, communiquePublish } = useSelector(
    ({ communiqueGet, communiqueAdd, communiquePublish }) => ({
      communiqueAdd,
      communiqueGet,
      communiquePublish,
    })
  );
  const { communiqueAdded } = communiqueAdd;
  const { communiquesFetching, communiques } = communiqueGet;
  const { published } = communiquePublish;
  useEffect(() => {
    dispatch(getCommuniques());
  }, [dispatch, communiqueAdded, published]);
  return (
    <div className='card'>
      <div className='card-header d-flex align-items-center'>
        Public communication
      </div>
      <div className='card-body'>
        <div className='table-responsive'>
          {communiquesFetching ? (
            <Loading />
          ) : communiques.length ? (
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Publish</th>
                  <th>Language</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {communiques.map((communique, communiqueIndex) => (
                  <tr key={communiqueIndex}>
                    <td>{communiqueIndex + 1}</td>
                    <td>{communique.title}</td>
                    <td>
                      <OverlayTrigger
                        placement='top'
                        overlay={
                          <Popover id={communiqueIndex}>
                            <Popover.Title as='h3'>
                              {communique.title}
                            </Popover.Title>
                            <Popover.Content>
                              {communique.content}
                            </Popover.Content>
                          </Popover>
                        }
                      >
                        <div>{truncate(communique.content, 30)}</div>
                      </OverlayTrigger>
                    </td>
                    <td>{communique.isPublished ? 'Yes' : 'No'}</td>
                    <td>{communique.languageId}</td>
                    <td>
                      <Button
                        onClick={() => dispatch(publishCommunique(communique))}
                        size='sm'
                        variant={communique.isPublished ? 'danger' : 'primary'}
                      >
                        {communique.isPublished ? 'Unpublish' : 'publish'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className='text-center'>No communication given</h5>
          )}
        </div>
      </div>
    </div>
  );
};
