import React, { useEffect } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import { Container, Row, Col } from 'react-bootstrap';
import { Page, Radio } from '../components';
import { Communique } from '../components/common';

export const RadioRRV = () => {
  useEffect(() => {
    addResponseMessage(
      'Mfite ikibazo! ko mwavuze ngo tuzajya mw ijuru none koko tuzajyayo koko'
    );
    addUserMessage('Murakoze rwose muraza gusubizwa');
  }, []);
  return (
    <Page title='Ijwi ry Ubugorozi'>
      <Communique />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={3}>
            <Radio />
          </Col>
          <Col xs={12} md={4} lg={4}>
            <Widget
              handleNewUserMessage={() => {}}
              profileAvatar=''
              title='Ijwi ry Ubugorozi'
              subtitle='Andika Ikibazo cyangwa igitekerezo cyawe'
            />
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
