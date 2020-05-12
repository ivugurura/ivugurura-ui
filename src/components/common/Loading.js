import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export const Loading = ({ message }) => {
  return (
    <>
      <h1 className='text-center'>
        <Spinner animation='border' />
      </h1>
      <h4>{message}</h4>
    </>
  );
};
