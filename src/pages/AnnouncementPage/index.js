import React, { useRef } from 'react';

import { ArrowBackOutlined as ArrowBackIcon } from '@mui/icons-material';
import {
  Container,
  Paper,
  IconButton,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

import { actions, initials } from '../../redux/apiSliceBuilder';

const AnnouncementsPage = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const { data, isFetching } = actions.useGetPubConfigQuery();

  const { data: communique } = data || initials.dataObj;

  if (isFetching || !communique) return null;

  const handleBack = () => navigate(-1);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 }, position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" onClick={handleBack} aria-label="Back">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">{communique.title}</Typography>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ mt: 2 }} ref={contentRef}>
          {communique?.content ? (
            <div
              className="announcement-html"
              style={{ wordBreak: 'break-word' }}
            >
              {parse(communique.content)}
            </div>
          ) : (
            <Typography color="text.secondary">
              No announcement to display.
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AnnouncementsPage;
