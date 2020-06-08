import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export const ActionButtons = ({
  isTopic,
  onPublish,
  status,
  onEdit,
  onDelete,
}) => {
  return (
    <ButtonGroup size='sm'>
      {isTopic ? (
        <Button variant='success' onClick={onPublish}>
          {status}
        </Button>
      ) : null}

      <Button onClick={onEdit}>Edit</Button>
      <Button variant='danger' onClick={onDelete}>
        Delete
      </Button>
    </ButtonGroup>
  );
};
