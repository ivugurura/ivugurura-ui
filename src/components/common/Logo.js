import React from 'react';
import { Navbar } from 'react-bootstrap';
import { textStyles } from '../../utils/styles';

export const Logo = () => {
  return (
    <Navbar.Brand href='/' style={textStyles.textTransparent}>
      <h2>
        <i>Ubugorozi</i>
      </h2>
    </Navbar.Brand>
  );
};
