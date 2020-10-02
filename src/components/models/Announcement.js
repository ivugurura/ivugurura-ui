import React, { useState, useEffect } from 'react';
import { Modal, Form, ButtonGroup, Button, FormGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addCommunique } from '../../redux/actions/communique';

const initialComm = {
  title: '',
  content: '',
  expiryDate: '',
};
export const Announcement = ({ show, onHide }) => {
  const [communique, setCommunique] = useState(initialComm);
  const dispatch = useDispatch();
  const { communiqueAdding, communiqueAdded } = useSelector(
    ({ communiqueAdd }) => communiqueAdd
  );
  useEffect(() => {
    if (communiqueAdded) {
      setCommunique(initialComm);
    }
  }, [communiqueAdded]);
  const onChangeInput = ({ target }) => {
    setCommunique({ ...communique, [target.name]: target.value });
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        Create a communication to the public
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <Form.Control
            type='text'
            name='title'
            placeholder='Title'
            value={communique.title}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Form.Control
            as='textarea'
            name='content'
            rows='3'
            placeholder='Type content here'
            onChange={onChangeInput}
            value={communique.content}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Will expire at</Form.Label>
          <Form.Control
            type='date'
            name='expiryDate'
            value={communique.expiryDate}
            onChange={onChangeInput}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <Button variant='danger' onClick={onHide}>
            Cancel
          </Button>
          <Button
            disabled={communiqueAdding}
            onClick={() => dispatch(addCommunique(communique))}
          >
            {communiqueAdding ? 'Saving,...' : 'Save'}
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
};
