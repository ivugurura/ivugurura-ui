import React from 'react';

export const Pause = ({ handleClick }) => {
  return (
    <button className='player__button' onClick={() => handleClick()}>
      Pause
    </button>
  );
};
