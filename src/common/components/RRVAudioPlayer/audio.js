import React, { forwardRef } from 'react';

const AudioPlay = forwardRef(({ src, autoPlay, preload }, ref) => {
  return (
    <audio
      ref={ref}
      src={src}
      autoPlay={autoPlay}
      preload={preload}
      controls
      style={{ display: 'none' }}
    >
      <track default kind="captions" src="" />
    </audio>
  );
});

export default AudioPlay;
