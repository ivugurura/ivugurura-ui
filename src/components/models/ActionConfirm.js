import React from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';

export const ActionConfirm = ({
  title,
  description,
  onAction,
  show,
  action,
  onHide,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>{title}</Modal.Header>
      <Modal.Body>
        {`Are sure you want to ${action} `}
        <strong>{description.toUpperCase()}?</strong>
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <Button variant='danger' onClick={onHide}>
            No
          </Button>
          <Button onClick={onAction}>Yes</Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
};
