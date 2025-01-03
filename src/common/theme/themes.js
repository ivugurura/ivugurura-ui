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
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'text' },
          style: {
            textTransform: 'none',
            color: palette.blackColor,
            '&:hover': {
              backgroundColor: 'transparent',
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
            color: '#fff',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#161722a9',
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
            border: `2px solid ${palette.darkBlue}`,
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#161722a9',
            },
          },
        },
      ],
    },
  },
});
