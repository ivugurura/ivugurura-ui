import React, { useState, useEffect } from 'react';
import { Modal, Button, Media } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { searchQuery } from '../../redux/actions';
import { Loading } from '../common';
import { Link } from 'react-router-dom';

export const SearchBox = ({ show, onHide }) => {
  const [searchVal, setSearchVal] = useState('');
  const dispatch = useDispatch();
  const { searching, finished, results } = useSelector(({ search }) => search);
  useEffect(() => {
    dispatch(searchQuery(searchVal));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal, searchQuery]);
  const goToCategory = (category) => {
    show = false;
  };
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
                <hr />
                {results.categories.length
                  ? results.categories.map((category, categoryIndex) => (
                      <Media.Body key={categoryIndex}>
                        <Link
                          to={`/topics/categories/${category.slug}`}
                          onClick={goToCategory(category)}
                        >
                          <h6>{category.name}</h6>
                        </Link>
                      </Media.Body>
                    ))
                  : null}
              </div>
              <div>
                <hr />
                {results.topics.length
                  ? results.topics.map((topic, topicIndex) => (
                      <Link key={topicIndex} to={`/topics/${topic.slug}`}>
                        <Media.Body>
                          <h6>{topic.title}</h6>
                          <p>{topic.description}</p>
                        </Media.Body>
                      </Link>
                    ))
                  : null}
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
