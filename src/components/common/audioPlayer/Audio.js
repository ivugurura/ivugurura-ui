import React from 'react';
import './custom-style.scss';
import { Song } from './Song';
import { Play } from './Play';
import { Pause } from './Pause';
import { Bar } from './Bar';
import { useAudioPlayer } from './useAudioPlayer';

export const Audio = () => {
  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
  } = useAudioPlayer();
  return (
    <div className='player'>
      <audio id='audio'>
        <source src='https://studio18.radiolize.com/radio/8220/radio.mp3?1587915754' />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Song songName='Abagorozi' songArtist='Umuntu' />
      <div className='controls'>
        {playing ? (
          <Pause handleClick={() => setPlaying(false)} />
        ) : (
          <Play handleClick={() => setPlaying(true)} />
        )}
        <Bar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={(time) => setClickedTime(time)}
        />
      </div>
    </div>
  );
};
