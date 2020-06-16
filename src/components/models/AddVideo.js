import React from 'react';
import { Modal } from 'react-bootstrap';

export const AddVideo = ({ show, onHide, children }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>Add a new video</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
