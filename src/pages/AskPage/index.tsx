/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo, useState } from 'react';

import { Send as SendIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { PageHelmet } from '../../common/components';

interface Source {
  title: string;
  slug: string;
}

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  time: string;
  sources?: Source[];
}

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// TODO: Replace with your FastAPI base URL
const BASE_URL = 'http://localhost:8000/api/v1';
const AskPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: 'Hello! Ask me anything about our topics.',
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  const handleSend = async () => {
    if (!canSend) return;

    const question = input.trim();

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: question,
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch answer');
      }

      const data = await response.json();
      console.log(data);

      const botMessage: Message = {
        id: `b-${Date.now()}`,
        role: 'bot',
        text: data?.data.answer || 'No answer found.',
        sources: data?.data.sources || [],
        time: formatTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage: Message = {
        id: `b-${Date.now()}`,
        role: 'bot',
        text: 'Sorry, something went wrong. Please try again.',
        time: formatTime(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PageHelmet title="Ask about any thing">
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 720, mx: 'auto' }}>
        <Box p={2}>
          <Typography variant="h6">Ask Ivugurura</Typography>
          <Typography variant="body2" color="text.secondary">
            Chat with the knowledge base
          </Typography>
        </Box>

        <Divider />

        <Box
          sx={{
            height: 420,
            overflowY: 'auto',
            p: 2,
            backgroundColor: '#fafafa',
          }}
        >
          <Stack spacing={2}>
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent:
                    msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Box sx={{ maxWidth: '75%', display: 'flex', gap: 1 }}>
                  {msg.role === 'bot' && (
                    <Avatar sx={{ width: 28, height: 28 }}>B</Avatar>
                  )}
                  <Box>
                    <Paper
                      sx={{
                        p: 1.5,
                        backgroundColor:
                          msg.role === 'user' ? '#1976d2' : '#ffffff',
                        color: msg.role === 'user' ? 'white' : 'inherit',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body2" whiteSpace="pre-line">
                        {msg.text}
                      </Typography>

                      {msg.sources && msg.sources.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Sources:
                          </Typography>
                          <Stack spacing={0.5} mt={0.5}>
                            {msg.sources.map((src) => (
                              <Link
                                key={src.slug}
                                href={`/topics/${src.slug}`}
                                underline="hover"
                                color="inherit"
                              >
                                {src.title}
                              </Link>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Paper>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5, display: 'block' }}
                    >
                      {msg.time}
                    </Typography>
                  </Box>
                  {msg.role === 'user' && (
                    <Avatar sx={{ width: 28, height: 28 }}>U</Avatar>
                  )}
                </Box>
              </Box>
            ))}

            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 28, height: 28 }}>B</Avatar>
                <Paper sx={{ p: 1, borderRadius: 2 }}>
                  <CircularProgress size={16} />
                </Paper>
              </Box>
            )}
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Ask a question..."
            multiline
            maxRows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton color="primary" onClick={handleSend} disabled={!canSend}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </PageHelmet>
  );
};

export default AskPage;
