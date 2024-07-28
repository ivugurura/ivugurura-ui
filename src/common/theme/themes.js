// import { createTheme as createThemeV4, createGenerateClassName } from '@material-ui/core/styles';
import { createTheme as createThemeV5 } from '@mui/material/styles';

import { palette } from './palette';
import { typography } from './typography';

// export const generateClassName = createGenerateClassName({
//   // By enabling this option, if you have non-MUI elements (e.g. `<div />`)
//   // using MUI classes (e.g. `.MuiButton`) they will lose styles.
//   // Make sure to convert them to use `styled()` or `<Box />` first.
//   disableGlobal: true,
//   // Class names will receive this seed to avoid name collisions.
//   seed: 'mui-jss',
// });

// export const themeV4 = createThemeV4({
//   palette,
//   typography,
// });

export const theme = createThemeV5({
  palette,
  typography,
});
