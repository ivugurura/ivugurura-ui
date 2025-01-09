/* eslint-disable no-param-reassign */
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useRef,
} from 'react';

const AudioContext = createContext(null);

export const RRVAudioProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.7);
  const [mute, setMute] = useState(true);
  const audioPlayerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  const changeVolume = (_, newValue) => {
    const volumeValue = newValue / 100;
    setVolume(volumeValue);
    if (volumeValue === 0) {
      setMute(true);
    }
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current.volume = volumeValue;
    }
  };

  const playPauseAudio = (audio) => {
    if (!audio && !audioPlayerRef.current) return;

    if (isPlaying) {
      audioPlayerRef.current.audio.current.pause();
    } else {
      audioPlayerRef.current.audio.current.play();
    }
    setIsPlaying((playing) => !playing);
  };

  const loopAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  const changeMute = (value) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current.muted = value;
    }
    setMute(value);
  };

  const contextValue = useMemo(
    () => ({
      volume,
      isLooping,
      isPlaying,
      mute,
      audioPlayerRef,
      changeIsPlaying: setIsPlaying,
      changeVolume,
      changeMute,
      loopAudio,
      playPauseAudio,
    }),
    [volume, isLooping, isPlaying, mute, audioPlayerRef],
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

/**
 * @typedef {Object} AudioPlayerContext
 * @property {number} volume - The volume 1-10
 * @property {boolean} isPlaying
 * @property {boolean} isLooping
 * @property {boolean} mute - whether show volume control
 * @property {Object}  audioPlayerRef - audio ref
 * @property {Function} changePlayingAudio - change playing audio
 * @property {Function} changeIsPlaying - change playing audio state
 * @property {Function} changeVolume - change volume
 * @property {Function} changeMute - Mute/unmute volume
 * @property {Function} loopAudio - Loop audio
 *
 * @returns {AudioPlayerContext}
 */
export const useRRVAudioPlayerCtx = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an RRVAudioProvider');
  }

  return context;
};
