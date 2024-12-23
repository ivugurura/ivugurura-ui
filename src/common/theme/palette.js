import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';
const blackColor = '#161722';
const grey = '#A6A6A7';
export const palette = {
  black,
  white,
  blackColor,
  primary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[100],
  },
  secondary: {
    contrastText: white,
    dark: colors.purple.A700,
    main: colors.purple.A200,
    light: colors.purple.A400,
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
    unselected: grey,
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#EEF0F1',
    paper: white,
  },
  divider: colors.grey[200],
};
