import { makeStyles } from '@mui/styles';

export const useHomeStyles = makeStyles(({ spacing, breakpoints }) => ({
  root: {
    backgroundImage: 'linear-gradient(to top,#7900EC 35%, #CC0DF9 )',
  },
  inner: {
    maxWidth: '100%',
    [breakpoints.only('xs')]: {
      padding: spacing(1, 2),
    },
    [breakpoints.up('sm')]: {
      justifyContent: 'center',
      padding: spacing(2, 15),
    },
  },
  media: {
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
}));
