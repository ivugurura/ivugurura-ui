import React from 'react';
import { Card } from 'react-bootstrap';

export const CardCounter = ({ color, count, title }) => {
  return (
    <Card bg={color}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>{count}</Card.Body>
    </Card>
  );
};
