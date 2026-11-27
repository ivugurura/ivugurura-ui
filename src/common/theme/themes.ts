import { createTheme, type Shadows } from '@mui/material/styles';

import { palette } from './palette';
import { typography } from './typography';

/** Same elevation scale as radio-ui. */
const shadows = [
  'none',
  '0px 2px 4px rgba(0, 0, 0, 0.05)',
  '0px 4px 8px rgba(0, 0, 0, 0.08)',
  '0px 8px 16px rgba(0, 0, 0, 0.12)',
  '0px 12px 24px rgba(0, 0, 0, 0.15)',
  '0px 16px 32px rgba(0, 0, 0, 0.18)',
  '0px 20px 40px rgba(0, 0, 0, 0.20)',
  '0px 24px 48px rgba(0, 0, 0, 0.22)',
  '0px 28px 56px rgba(0, 0, 0, 0.24)',
  '0px 32px 64px rgba(0, 0, 0, 0.26)',
  '0px 36px 72px rgba(0, 0, 0, 0.28)',
  '0px 40px 80px rgba(0, 0, 0, 0.30)',
  '0px 44px 88px rgba(0, 0, 0, 0.32)',
  '0px 48px 96px rgba(0, 0, 0, 0.34)',
  '0px 52px 104px rgba(0, 0, 0, 0.36)',
  '0px 56px 112px rgba(0, 0, 0, 0.38)',
  '0px 60px 120px rgba(0, 0, 0, 0.40)',
  '0px 64px 128px rgba(0, 0, 0, 0.42)',
  '0px 68px 136px rgba(0, 0, 0, 0.44)',
  '0px 72px 144px rgba(0, 0, 0, 0.46)',
  '0px 76px 152px rgba(0, 0, 0, 0.48)',
  '0px 80px 160px rgba(0, 0, 0, 0.50)',
  '0px 84px 168px rgba(0, 0, 0, 0.52)',
  '0px 88px 176px rgba(0, 0, 0, 0.54)',
  '0px 92px 184px rgba(0, 0, 0, 0.56)',
] as Shadows;

export const theme = createTheme({
  palette,
  typography,
  shape: { borderRadius: 8 },
  shadows,
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
        },
        sizeSmall: { padding: '4px 10px' },
        sizeLarge: { padding: '10px 22px' },
      },
      // RRV buttons are navy rather than primary blue.
      variants: [
        {
          props: { variant: 'text' },
          style: {
            color: palette.blackColor,
            '&:hover': { backgroundColor: 'rgba(22, 34, 42, 0.06)' },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            color: palette.white,
            backgroundColor: palette.navy,
            '&:hover': { backgroundColor: palette.navyLight },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: palette.navy,
            borderColor: palette.navy,
            '&:hover': {
              borderColor: palette.navy,
              backgroundColor: 'rgba(22, 34, 42, 0.06)',
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
          color: theme.palette.text.primary,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
  },
});
