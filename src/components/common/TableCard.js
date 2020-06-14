import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './Loading';
import { getMedias } from '../../redux/actions';

export const TableCard = () => {
  const dispatch = useDispatch();
  const { medias, mediasFetching } = useSelector(({ media }) => media);
  useEffect(() => {
    dispatch(getMedias());
  }, [getMedias]);
  return (
    <div className='card'>
      <div className='card-header d-flex align-items-center'>
        <h3>Media list</h3>
      </div>
      <div className='card-body'>
        <div className='table-responsive'>
          {mediasFetching ? (
            <Loading />
          ) : medias.length ? (
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Album</th>
                  <th>Language</th>
                </tr>
              </thead>
              <tbody>
                {medias.map((media, mediaIndex) => (
                  <tr key={mediaIndex}>
                    <th scope='row'>{mediaIndex + 1}</th>
                    <td>{media.title}</td>
                    <td>{media.type}</td>
                    <td>{media.album.name}</td>
                    <td>{media.language.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className='text-center'>No media</h5>
          )}
        </div>
      </div>
    </div>
  );
};
