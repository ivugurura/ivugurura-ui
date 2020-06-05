import React, { useState, useEffect } from 'react';
import { Modal, Button, Media } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { searchQuery } from '../../redux/actions';
import { Loading } from '../common';

const data = [];
export const SearchBox = ({ show, onHide }) => {
  const [searchVal, setSearchVal] = useState('');
  const dispatch = useDispatch();
  const { searching, finished, results } = useSelector(({ search }) => search);
  useEffect(() => {
    dispatch(searchQuery(searchVal));
  }, [searchVal, searchQuery]);
  return (
    <Modal size='lg' show={show} onHide={onHide}>
      <Modal.Header closeButton>
        Search any thing you want in the website
      </Modal.Header>
      <Modal.Body>
        <input
          type='text'
          className='form-control'
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <div>
          {searching ? (
            <Loading />
          ) : finished ? (
            <>
              <div>
                <h4 className='text-center text-info'>Categories</h4>
                {results.categories.length ? (
                  results.categories.map((category, categoryIndex) => (
                    <Media.Body key={categoryIndex}>
                      <h6>{category.name}</h6>
                    </Media.Body>
                  ))
                ) : (
                  <h4>No categories found</h4>
                )}
              </div>
              <div>
                <h4 className='text-center text-info'>Topics</h4>
                {results.topics.length ? (
                  results.topics.map((topic, topicIndex) => (
                    <Media.Body key={topicIndex}>
                      <h6>{topic.title}</h6>
                      <p>{topic.description}</p>
                    </Media.Body>
                  ))
                ) : (
                  <h4>No topics found</h4>
                )}
              </div>
            </>
          ) : null}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
