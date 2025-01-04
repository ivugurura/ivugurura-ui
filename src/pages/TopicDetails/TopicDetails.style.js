import { palette } from '../../common/theme/palette';

export const styles = {
  root: {
    margin: '20px 0',
    borderRadius: '8px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: palette.blackColor,
  },
  comment: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    background: '#fdfdfd',
  },
  commentBody: {
    marginBottom: '10px',
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  commentText: {
    margin: '5px 0 0',
  },
  commentTimestamp: {
    fontSize: '12px',
    color: '#777',
  },
  reply: {
    marginLeft: '20px',
    paddingLeft: '15px',
    borderLeft: '3px solid #007BFF',
    background: '#f8f9fa',
    borderRadius: '5px',
  },
  replyBody: {
    padding: '10px 0',
  },
  replyAuthor: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  replyText: {
    margin: '5px 0 0',
  },
  replyTimestamp: {
    fontSize: '12px',
    color: '#555',
  },
  commentSpace: {
    background: '#E8E8E8',
    border: '1px solid #E8E8E8',
    borderRadius: '12px',
    padding: 32,
  },
  submitBtn: {
    background: '#18232C',
    boxShadow: 'none',
    fontWeight: '400',
    padding: '10px 30px',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '10px',
  },
  dividers: {
    borderColor: palette.blackColor,
    borderWidth: '0.5px',
    margin: '0 10px',
    height: 'auto',
  },
  slug: {
    cursor: 'pointer',
  },
  unselect: {
    color: palette.text.secondary,
    cursor: 'pointer',
    paddingBottom: '20px',
  },
  select: {
    color: palette.blackColor,
    cursor: 'pointer',
    paddingBottom: '20px',
  },
};
