import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';

/** Brand navy used by the navbar, footer and hero. */
const navy = '#16222a';
const navyLight = '#3a6073';

// Legacy keys still referenced by pages; remove as each page is revamped.
const blackColor = '#161722';
const grey = '#A6A6A7';
const darkBlue = '#18232C';
const darkGray = '#101828';
const darkGreen = '#475467';
const listGrey = '#B3B3B3';
const green = '#65D36E';

/** Status colors shared with radio-ui. */
const status = {
  success: { main: '#4caf50', light: '#81c784', dark: '#388e3c' },
  warning: { main: '#ff9800', light: '#ffb74d', dark: '#f57c00' },
  error: { main: '#f44336', light: '#e57373', dark: '#d32f2f' },
  info: { main: '#2196f3', light: '#64b5f6', dark: '#1976d2' },
};

export const palette = {
  black,
  white,
  navy,
  navyLight,
  blackColor,
  darkBlue,
  darkGray,
  darkGreen,
  listGrey,
  green,
  // Primary is the RRV brand blue (unchanged).
  primary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[100],
  },
  // Everything below follows radio-ui.
  secondary: {
    main: '#0288d1',
    light: '#03dac6',
    dark: '#018786',
    contrastText: white,
  },
  ...status,
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    link: colors.blue[600],
    unselected: grey,
  },
  background: {
    default: '#f5f7fa',
    paper: white,
  },
  divider: '#e0e6ed',
};
