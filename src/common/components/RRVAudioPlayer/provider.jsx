import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

const AudioContext = createContext(null);

export const RRVAudioProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.7);
  const [mute, setMute] = useState(true);
  const audioPlayerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  const changeVolume = useCallback(
    (_, newValue) => {
      const volumeValue = newValue / 100;
      setVolume(volumeValue);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.audio.current.volume = volumeValue;
        setMute(volumeValue === 0);
      }
    },
    [audioPlayerRef],
  );

  const playPauseAudio = useCallback(
    (audio) => {
      if (!audio && !audioPlayerRef.current) return;

      if (isPlaying) {
        audioPlayerRef.current.audio.current.pause();
      } else {
        audioPlayerRef.current.audio.current.play();
        setMute(false);
      }
      setIsPlaying((playing) => !playing);
    },
    [isPlaying, audioPlayerRef],
  );

  const loopAudio = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  }, [isLooping, audioPlayerRef]);

  const changeMute = useCallback(
    (value) => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.audio.current.muted = value;
      }
      setMute(value);
    },
    [audioPlayerRef],
  );

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
    [
      volume,
      isLooping,
      isPlaying,
      mute,
      audioPlayerRef,
      changeVolume,
      changeMute,
      loopAudio,
      playPauseAudio,
    ],
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
