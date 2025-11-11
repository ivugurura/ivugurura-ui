import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from 'react';


interface RRVAudioProviderProps{
  children: ReactNode;
}

interface IAudioPlayerContextType {
  volume: number;
  isPlaying: boolean;
  isLooping: boolean;
  mute: boolean;
  audioPlayerRef: Ref<unknown> ;
  changeIsPlaying: (value: boolean) => void;
  changeVolume: (event: Event, value: number | number[]) => void;
  changeMute: (value: boolean) => void;
  loopAudio: () => void;
  playPauseAudio: (audio?: HTMLAudioElement) => void;
}


const AudioContext = createContext<IAudioPlayerContextType>(null);

export const RRVAudioProvider: React.FC<RRVAudioProviderProps> = ({ children }) => {
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

export const useRRVAudioPlayerCtx = ()=> {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an RRVAudioProvider');
  }

  return context;
};
