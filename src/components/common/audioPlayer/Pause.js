import React from 'react';
import { MdPauseCircleFilled } from 'react-icons/md';

export const Pause = ({ handleClick }) => {
  return (
    <button className='player__button' onClick={() => handleClick()}>
      <MdPauseCircleFilled />
    </button>
  );
};
