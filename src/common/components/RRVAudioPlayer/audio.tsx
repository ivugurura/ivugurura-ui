import { forwardRef } from 'react';

interface AudioPlayProps extends React.AudioHTMLAttributes<HTMLAudioElement>{
  src: string;
}

const AudioPlay = forwardRef<HTMLAudioElement, AudioPlayProps>(({ src, autoPlay, preload }, ref) => {
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

AudioPlay.displayName = 'AudioPlay';

export default AudioPlay;
