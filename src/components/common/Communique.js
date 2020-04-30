import React from 'react';
import MarqueeText from 'react-marquee-text-component';
import { Container, Alert } from 'react-bootstrap';

export const Communique = () => {
  return (
    <Container className='mt-2' fluid>
      <Alert variant='danger'>
        <h4>
          <MarqueeText
            text='Itangazo: Muratumiwe mu materaniro ya conference y isi yose'
            repeat={1}
          />
        </h4>
      </Alert>
    </Container>
  );
};
