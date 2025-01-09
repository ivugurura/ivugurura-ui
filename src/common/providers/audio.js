/* eslint-disable no-param-reassign */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const playAudio = (audioRef) => {
    // Pause the current audio if it's not the same as the one being played
    if (currentAudio && currentAudio !== audioRef && currentAudio.current) {
      currentAudio.current.pause();
    }

    // Play the audio
    if (audioRef.current) {
      audioRef.current.play();
      setCurrentAudio(audioRef);
      setIsPlaying(true);
      setTimeProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
      audioRef.current.onended = () => {
        currentAudio?.current?.pause();
        setIsPlaying(false);
      };
    }
  };

  const pauseAudio = () => {
    if (currentAudio?.current) {
      currentAudio.current.pause();
      setIsPlaying(false);
    }
  };

  const updateProgress = useCallback(() => {
    if (currentAudio?.current) {
      setTimeProgress(currentAudio.current.currentTime);
      setDuration(currentAudio.current.duration);
    }
  }, [currentAudio]);

  useEffect(() => {
    const audioElement = currentAudio?.current;

    const handleTimeUpdate = () => {
      updateProgress();
    };

    const handleLoadedMetadata = () => {
      updateProgress();
    };

    if (currentAudio && audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (currentAudio && audioElement) {
        audioElement.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata,
        );
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [currentAudio, updateProgress]);

  const contextValue = useMemo(
    () => ({
      currentAudio,
      setCurrentAudio,
      playAudio,
      pauseAudio,
      isPlaying,
      timeProgress,
      duration,
    }),
    [],
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};
