import { colors } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const itemHorzPadding = 3;
export const useStyles = makeStyles((theme) => ({
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
    minWidth: 32,
    display: 'none', // hide the ListItemIcon in the dropdown
    color: 'white',
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
}));

export default useStyles;
