import React from 'react';
import { Modal, Form, ButtonGroup, Button } from 'react-bootstrap';

export const AddMenu = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>Create a new menu</Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control type='text' name='name' placeholder='Category name' />
        </Form.Group>
        <Form.Group controlId='parent'>
          <Form.Label>Parent category</Form.Label>
          <Form.Control as='select' custom>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <Button variant='danger' onClick={onHide}>
            Cancel
          </Button>
          <Button>Save</Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
};
