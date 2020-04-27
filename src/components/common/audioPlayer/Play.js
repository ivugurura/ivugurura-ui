import React from 'react';

export const Play = ({ handleClick }) => {
  return (
    <button className='player__button' onClick={() => handleClick()}>
      Play
    </button>
  );
};
