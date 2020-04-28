import React from 'react';
import { MdPlayCircleFilled } from 'react-icons/md';

export const Play = ({ handleClick }) => {
  return (
    <button className='player__button' onClick={() => handleClick()}>
      <MdPlayCircleFilled />
    </button>
  );
};
