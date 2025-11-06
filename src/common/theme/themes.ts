import { createTheme as createThemeV5 } from '@mui/material/styles';

import { palette } from './palette';
import { typography } from './typography';

export const theme = createThemeV5({
  palette,
  typography,
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'text' },
          style: {
            textTransform: 'none',
            color: palette.blackColor,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '@media (max-width: 768px)': {
              fontSize: '12px',
            },
            '@media (max-width: 480px)': {
              fontSize: '12px',
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            background: palette.darkBlue,
            fontWeight: 400,
            padding: '12px 10px',
            borderRadius: '12px',
            boxShadow: 'none',
            fontSize: '14px',
            color: '#fff',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#161722a9',
            },
            '@media (max-width: 768px)': {
              fontSize: '12px',
            },
            '@media (max-width: 480px)': {
              fontSize: '12px',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: palette.darkBlue,
            fontWeight: 600,
            p: 1.8,
            borderRadius: '12px',
            boxShadow: 'none',
            fontSize: '14px',
            border: `2px solid ${palette.darkBlue}`,
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#161722a9',
            },
            '@media (max-width: 768px)': {
              fontSize: '12px',
            },
            '@media (max-width: 480px)': {
              fontSize: '12px',
            },
          },
        },
      ],
    },
  },
});
