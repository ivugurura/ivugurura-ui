import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import { Page, Radio } from '../components';
import { Communique } from '../components/common';
import { ChatInput, Messages } from '../components/Chat';
import { userListener } from '../utils/constants';

export const RadioRRV = () => {
  const localUser = localStorage.getItem(userListener);
  const [user, setUser] = useState({});
  const [listener, setListener] = useState({ id: '', name: '' });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = (event) => {};
  useEffect(() => {
    setMessages([{ user: 'Kalisa', text: 'Murakoze' }]);
    setUsers([{ id: 'some-id', name: 'Kalisa' }]);
  }, []);
  useEffect(() => {
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, [localUser]);
  const saveListener = () => {
    if (listener.name) {
      listener.id = v4();
      localStorage.setItem(userListener, JSON.stringify(listener));
      setListener({ id: '', name: '' });
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
          <Col xs={12} md={4} lg={4}>
            <ul>
              {users.map((user, userIdx) => (
                <li key={userIdx}>{user.name}</li>
              ))}
            </ul>
          </Col>
          <Col xs={12} md={5} lg={5}>
            <Card>
              <Card.Header>Reformation voice</Card.Header>
              <div className='outerContainer'>
                <div className='chatContainer'>
                  {user.name ? (
                    <>
                      <Card.Body>
                        <Messages messages={messages} name={user.name} />
                      </Card.Body>
                      <Card.Footer>
                        <ChatInput
                          message={message}
                          setMessage={setMessage}
                          sendMessage={sendMessage}
                        />
                      </Card.Footer>
                    </>
                  ) : (
                    <InputGroup size='lg' className='mb-4 mt-4'>
                      <FormControl
                        placeholder='To give idea or concern, give your names'
                        aria-label='To give idea or concern, give your names'
                        aria-describedby='listener-info'
                        value={listener.name}
                        onChange={({ target }) =>
                          setListener({ ...listener, name: target.value })
                        }
                      />
                      <InputGroup.Append>
                        <Button
                          variant='outline-secondary'
                          onClick={saveListener}
                        >
                          Save
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  )}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
