import React from 'react';

import {
  Search as SearchIcon,
  Topic as TopicIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { toLink } from '../../../helpers/utils/constants';
import { actions } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[600], 0.25),
  },
}));
export const SearchModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const { data, isFetching } = actions.useSearchSystemQuery();
  const { data: searched } = data || initials.dataObj;
  console.log({ isFetching });

  const handleNavigate = (type, slug) => {
    if (type === 'topic') {
      navigate(toLink(`topics/${slug}`));
    } else {
      navigate(toLink(`topics?t=${slug}`));
    }
    onClose();
  };

  const totalCategories = searched.categories?.length || 0;
  const totalTopics = searched.topics?.length || 0;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Paper
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search anything: topics and topic categories"
            inputProps={{ 'aria-label': 'search google maps' }}
            autoFocus
          />
          <IconButton sx={{ p: '10px' }} aria-label="Close">
            Esc
          </IconButton>
        </Paper>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {searched.categories?.map((category, categoryIdx) => (
            <React.Fragment key={category.id}>
              <ListItemStyled
                alignItems="flex-start"
                onClick={() => handleNavigate('category', category.slug)}
              >
                <ListItemAvatar>
                  <CategoryIcon />
                </ListItemAvatar>
                <ListItemText primary={category.name} />
              </ListItemStyled>
              {categoryIdx < totalCategories - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {searched.topics?.map((topic, topicIdx) => (
            <React.Fragment key={topic.id}>
              <ListItemStyled
                alignItems="flex-start"
                onClick={() => handleNavigate('topic', topic.slug)}
              >
                <ListItemAvatar>
                  <TopicIcon />
                </ListItemAvatar>
                <ListItemText
                  primary={topic.title}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {moment(topic.updatedAt).format('DD.MM.YYYY')}
                      </Typography>
                      {` — ${topic.content}`}
                    </>
                  }
                />
              </ListItemStyled>
              {topicIdx < totalTopics - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};
