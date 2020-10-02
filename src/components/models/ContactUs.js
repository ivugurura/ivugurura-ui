import React from 'react';
import { Modal } from 'react-bootstrap';
import { ContactForm } from '../ContactForm';

export const ContactUs = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          If you have any question or concern, fill it in the form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactForm />
      </Modal.Body>
    </Modal>
  );
};
