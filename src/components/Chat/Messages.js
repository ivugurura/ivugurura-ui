import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import { CardMessage } from './CardMessage';

import './styles/messages.css';

export const Messages = ({ messages, userId }) => (
  <ScrollToBottom className='messages'>
    {messages.map((message, i) => (
      <div key={i}>
        <CardMessage message={message} userId={userId} />
      </div>
    ))}
  </ScrollToBottom>
);
