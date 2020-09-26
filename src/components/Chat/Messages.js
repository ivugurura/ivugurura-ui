import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import { CardMessage } from './CardMessage';

import './styles/messages.css';

export const Messages = ({ messages, name }) => (
  <ScrollToBottom className='messages'>
    {messages.map((message, i) => (
      <div key={i}>
        <CardMessage message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);
