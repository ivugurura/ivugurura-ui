import React from 'react';

import ReactEmoji from 'react-emoji';

import './styles/cardMessage.css';

export const CardMessage = ({ message: { senderName, content }, name }) => {
  let isSentByCurrentUser = false;

  if (senderName === name) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-10'>{name}</p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>{ReactEmoji.emojify(content)}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>{content}</p>
      </div>
      <p className='sentText pl-10'>{senderName}</p>
    </div>
  );
};
