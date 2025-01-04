import { colors } from '@mui/material';

import { theme } from '../theme';

const itemHorzPadding = 3;
export const useStyles = {
  content: {
    // paddingTop: 56,
    // [theme.breakpoints.up('sm')]: {
    //   paddingTop: 64,
    // },
  },
  root: {
    boxShadow: 'none',
    // alignItems: 'center'
  },
  flexGrow: {
    flexGrow: 1,
  },

  forumButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.purple.A400,
    '&:hover': {
      backgroundColor: colors.purple.A700,
    },
  },
  forumIcon: {
    marginRight: theme.spacing(1),
  },

  title: {
    flexGrow: 1,
    color: '#ffffff',
    fontWeight: 900,
  },

  select: {
    display: 'flex',
    color: 'white',
    margin: theme.spacing(1),
    minWidth: 120,
    background: colors.purple[600],
    borderStyle: 'none',
    borderRadius: 8,
    paddingLeft: 24,
    paddingTop: 14,
    marginRight: 20,
    paddingBottom: 15,
    boxShadow: 'none',
    '&:focus': {
      borderRadius: 8,
      background: colors.purple[600],
    },
    '&[aria-expanded="true"]': {
      background: colors.purple[600],
    },
    '& > div': {
      display: 'inline-flex', // this shows the icon in the SelectInput but not the dropdown
    },
  },
  icon: {
    color: 'white',
    right: 12,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  paper: {
    borderRadius: 4,
    marginTop: 8,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 8,
    paddingLeft: 8,
    background: 'white',
    '& li': {
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 8,
      paddingLeft: 8,
    },
    '& li:hover': {
      background: colors.purple[600],
      color: 'white',
    },
    '& li.Mui-selected': {
      color: 'black',
      background: 'white',
    },
    '& li.Mui-selected:hover': {
      background: colors.purple[600],
      color: 'white',
    },
  },
  listIcon: {
    color: '#1D1B20',
  },
  overviewIcon: {
    color: '#fff',
  },
  white: {
    color: '#fff',
  },
  item: {
    padding: theme.spacing(1, itemHorzPadding),
    margin: theme.spacing(0, 1),
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#ffffff',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  itemActive: {
    padding: theme.spacing(1, itemHorzPadding),
    cursor: 'pointer',
    margin: theme.spacing(0, 1),
    textDecoration: 'none',
    color: '#ffffff',
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  loginButton: {
    marginLeft: theme.spacing(1),
    backgroundColor: colors.purple.A400,
    '&:hover': {
      backgroundColor: colors.purple.A700,
    },
  },
  loginIcon: {
    marginRight: theme.spacing(1),
  },
  middle: {
    alignItems: 'center',
    flexGrow: 1,
  },
  left: {
    flexGrow: 1,
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: '0 0 auto',
  },
  styledMenuItem: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#ff5500',
      },
    },
  },
  listItem: {
    background: '#fff',
    margin: 1,
    borderRadius: '32px',
    paddingBottom: 0,
    cursor: 'pointer',
  },
  selectedListItem: {
    border: '2px solid #1F323C',
  },
  listOverview: {
    background: 'transparent',
    paddingBottom: 0,
    cursor: 'pointer',
  },

  cardAudio: {
    background: 'linear-gradient(to bottom, #395E71, #1A2932)',
    borderRadius: '48px',
    padding: '1rem',
  },
  cardContainer: {
    margin: '4rem 0 0 0',
  },
  audioText: {
    color: '#DEFFF9',
  },

  playWrapper: {
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
      color: theme.palette.grey[600],
      fontWeight: '400',
      fontSize: '14px',
    },
    '& .rhap_progress-filled': {
      backgroundColor: theme.palette.grey[900],
    },
    '& .rhap_download-progress': {
      backgroundColor: theme.palette.grey[400],
    },
    '& .rhap_progress-bar-show-download': {
      backgroundColor: theme.palette.grey[500],
    },
    '& .rhap_progress-indicator': {
      display: 'none',
    },
    '& .rhap_progress-bar': {
      height: '5px',
      borderRadius: '4px',
    },
  },
  unloop: {
    color: theme.palette.grey[500],
  },
  volumeContainer: {
    position: 'absolute',
    top: '-70%',
    left: '50%',
    transform: 'translateX(-50%)',
    transformOrigin: 'left center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '4px 14px',
    zIndex: 1000,

    width: '120px',
  },
  slider: {
    '& .MuiSlider-track': {
      backgroundColor: '#000',
      border: 'none',
    },
    '& .MuiSlider-rail': {
      backgroundColor: 'grey.300',
    },
    '& .MuiSlider-thumb': {
      color: '#000',
      width: '14px',
      height: '14px',
    },
  },
};

export default useStyles;
