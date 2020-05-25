import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const ActionConfirm = ({ title, description, onAction }) => {
  return (
    <Modal>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onAction}></Button>
      </Modal.Footer>
    </Modal>
  );
};
