import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Button,
  ListGroup
} from 'react-bootstrap';
import '../components/Chat/styles/chat.css';
import socketIo from 'socket.io-client';
import { Page, Radio } from '../components';
import { Communique } from '../components/common';
import { ChatInput, Messages } from '../components/Chat';
import { USER_LISTENER } from '../utils/constants';
import { getMessages } from '../redux/actions';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

let socket = socketIo(process.env.REACT_APP_API_URL);
export const RadioRRV = () => {
  const localUser = localStorage.getItem(USER_LISTENER);
  const {
    chatGet: { loaded, messages: chats },
    user: { isAuthenticated, info }
  } = useSelector(({ chatGet, user }) => ({ chatGet, user }));
  const [user, setUser] = useState({});
  const [listener, setListener] = useState({ userId: '', name: '' });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [joinMessages, setJoinMessages] = useState([]);

  useEffect(() => {
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
    if (isAuthenticated) {
      setUser({ userId: info.email, name: info.names });
    }
  }, [localUser, isAuthenticated]);

  useEffect(() => {
    if (user.userId) {
      const msgParams = isAuthenticated ? null : user.userId;
      socket.emit('join', user, (error) => {
        if (error) console.log('Error', error);
      });
      getMessages(msgParams);
    }
  }, [user, isAuthenticated]);
  useEffect(() => {
    if (isAuthenticated) {
      getMessages();
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (loaded) {
      setMessages(chats);
    }
  }, [loaded, chats]);
  useEffect(() => {
    socket.on('join-message', (joinMessage) => {
      toast(joinMessage.content);
    });
    socket.on('users-list', ({ users: listeners }) => {
      setUsers(listeners);
    });
    socket.on('new-message', (newMessage) => {
      setMessages((msgs) => [...msgs, newMessage]);
    });
  }, []);
  const saveListener = () => {
    if (listener.name) {
      listener.userId = v4();
      localStorage.setItem(USER_LISTENER, JSON.stringify(listener));
      setListener({ userId: '', name: '' });
    }
  };
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('send-message', { userId: user.userId, message }, () =>
        setMessage('')
      );
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
            <Row>
              <Col xs={12} md={12} lg={12}>
                <ListGroup variant='flush'>
                  {users.map((user, userIdx) => (
                    <ListGroup.Item key={userIdx}>{user.name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col xs={12} md={12} lg={12}>
                <ListGroup variant='flush'>
                  {joinMessages.map((msg, msgIdx) => (
                    <ListGroup.Item key={msgIdx}>{msg.content}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={5} lg={5}>
            <Card>
              <Card.Header>Reformation voice</Card.Header>
              {user.name ? (
                <>
                  <Card.Body>
                    <div className='outerContainer'>
                      <div className='chatContainer'>
                        <Messages messages={messages} name={user.name} />
                      </div>
                    </div>
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
                    <Button variant='outline-secondary' onClick={saveListener}>
                      Save
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
