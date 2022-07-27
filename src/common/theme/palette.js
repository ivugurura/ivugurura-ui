import { colors } from "@mui/material";

const white = "#FFFFFF";
const black = "#000000";

const palette = {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.purple[900],
    main: colors.purple[600],
    light: colors.purple[100],
  },
  secondary: {
    contrastText: white,
    dark: colors.purple["A700"],
    main: colors.purple["A200"],
    light: colors.purple["A400"],
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
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: "#EEF0F1",
    paper: white,
  },
  divider: colors.grey[200],
};

export default palette;
