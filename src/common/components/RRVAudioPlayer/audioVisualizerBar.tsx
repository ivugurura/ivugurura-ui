import type React from 'react';

import { Box } from '@mui/material';

interface AudioVisualizerProps {
  isPlaying: boolean;
  background: string | ((theme: Theme) => string);
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  background = '#000',
}) => {
  const fixedHeights = ['30%', '70%', '50%', '60%'];
  const bars = 4;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '2px',
        height: '28px',
        width: '28px',
        padding: '2px',
      }}
    >
      {[...Array<undefined>(bars)].map((_, index) => (
        <Box
          key={index}
          sx={{
            width: '3px',
            backgroundColor: background,
            borderRadius: '2px',
            flex: 1,
            height: isPlaying ? undefined : fixedHeights[index],
            animation: isPlaying
              ? `barAnimation${index} 1.2s ease-in-out infinite`
              : 'none',
            '@keyframes barAnimation0': {
              '0%, 100%': { height: '30%' },
              '50%': { height: '80%' },
            },
            '@keyframes barAnimation1': {
              '0%, 100%': { height: '70%' },
              '50%': { height: '40%' },
            },
            '@keyframes barAnimation2': {
              '0%, 100%': { height: '50%' },
              '50%': { height: '90%' },
            },
            '@keyframes barAnimation3': {
              '0%, 100%': { height: '60%' },
              '50%': { height: '30%' },
            },
          }}
        />
      ))}
    </Box>
  );
};
