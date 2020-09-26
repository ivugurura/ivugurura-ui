import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Page, Radio } from '../components';
import { Communique } from '../components/common';
import { InfoBar, ChatInput, Messages } from '../components/Chat';

export const RadioRRV = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('Reformation voice');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
    }
  };
  return (
    <Page title='Ijwi ry Ubugorozi'>
      <Communique />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={3}>
            <Radio />
          </Col>
          <Col xs={12} md={5} lg={5}>
            <div className='outerContainer'>
              <div className='chatContainer'>
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <ChatInput
                  message={message}
                  setMessage={setMessage}
                  sendMessage={sendMessage}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
