import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './styles/chat.css';
import { ChatContainer } from './ChatContainer';
import { InfoBar } from './InfoBar';
import { Messages } from './Messages';
import { ChatInput } from './ChatInput';

let socket;

export const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://react-chat-page.herokuapp.com/';

  useEffect(() => {
    const { name, room } = { name: 'akimana', room: 'ajaroom' };

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((msgs) => [...msgs, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      {/* <ChatContainer users={users} /> */}
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
  );
};
