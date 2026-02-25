import { Box } from '@mui/material';
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
export const PlayerWrapper = makeStyles(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  '& .rhap_container': {
    width: '100%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  '& .rhap_time': {
    color: '#fff',
  },
  '& .rhap_progress-filled': {
    backgroundColor: '#000',
  },
  '& .rhap_download-progress': {
    backgroundColor: theme.palette.grey[300],
  },
  '& .rhap_progress-bar-show-download': {
    backgroundColor: theme.palette.grey[100],
  },
}));
