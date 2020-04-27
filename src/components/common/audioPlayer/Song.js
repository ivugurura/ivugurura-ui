import React from 'react';

export const Song = ({ songName, songArtist }) => {
  return (
    <div className='song'>
      <h1 className='song__title'>{songName}</h1>
      <h2 className='song__artist'>{songArtist}</h2>
    </div>
  );
};
