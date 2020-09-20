import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const songUrl = `${process.env.PUBLIC_URL}/Mbese-nkore-iki.mp3`;
export const AudioPlayer = () => {
  return <ReactAudioPlayer src={songUrl} controls controlsList='' />;
};
