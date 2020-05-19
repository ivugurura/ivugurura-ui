import React, { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';

export const Notifier = ({ message }) => {
  let [show, setShow] = useState(false);
  useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);
  return (
    <Toast
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <strong className='mr-auto'>Notifier</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};
