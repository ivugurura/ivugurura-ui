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

import { PageHelmet, useLang } from '../../common/components';

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
  const { languageId } = useLang();

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
        body: JSON.stringify({ question, languageId }),
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
      <Box
        sx={{
          minHeight: '100vh',
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
          background:
            'radial-gradient(1200px 600px at 10% 0%, rgba(255, 233, 229, 0.9), rgba(255, 255, 255, 0.2)), radial-gradient(1000px 800px at 100% 0%, rgba(218, 232, 255, 0.85), rgba(255, 255, 255, 0.35)), #f7f5f2',
          fontFamily:
            '"Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <Box
          sx={{
            maxWidth: 960,
            mx: 'auto',
            position: 'relative',
            '@keyframes riseIn': {
              from: { opacity: 0, transform: 'translateY(6px)' },
              to: { opacity: 1, transform: 'translateY(0px)' },
            },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 6,
              border: '1px solid rgba(17, 25, 40, 0.08)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: { xs: 'calc(100vh - 96px)', md: 'calc(100vh - 144px)' },
              boxShadow:
                '0px 40px 120px -60px rgba(15, 23, 42, 0.4), 0px 24px 40px -24px rgba(15, 23, 42, 0.3)',
            }}
          >
            <Box
              sx={{
                px: { xs: 3, md: 4 },
                py: { xs: 3, md: 3.5 },
                background: 'linear-gradient(135deg, #fef3ee, #eef4ff)',
              }}
            >
              <Stack spacing={1}>
                <Typography
                  variant="overline"
                  sx={{
                    letterSpacing: '0.2em',
                    color: 'rgba(37, 51, 84, 0.7)',
                  }}
                >
                  Ask Ivugurura
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Fraunces", "Iowan Old Style", serif',
                    fontWeight: 600,
                    color: '#1b2238',
                  }}
                >
                  Chat with your knowledge base
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ask a question and get a clear answer with sources.
                </Typography>
              </Stack>
            </Box>

            <Divider />

            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                px: { xs: 2, md: 4 },
                py: { xs: 2, md: 3 },
                background:
                  'radial-gradient(1200px 500px at 10% 10%, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.3)), #fbfbfb',
              }}
            >
              <Stack spacing={2.5}>
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent:
                        msg.role === 'user' ? 'flex-end' : 'flex-start',
                      animation: 'riseIn 240ms ease',
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: { xs: '92%', sm: '75%' },
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'flex-end',
                      }}
                    >
                      {msg.role === 'bot' && (
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: '#1f2937',
                            color: 'white',
                            fontSize: 14,
                          }}
                        >
                          IV
                        </Avatar>
                      )}
                      <Box>
                        <Paper
                          sx={{
                            p: 2,
                            backgroundColor:
                              msg.role === 'user' ? '#1d4ed8' : '#ffffff',
                            color: msg.role === 'user' ? 'white' : '#1f2937',
                            borderRadius: 3,
                            border:
                              msg.role === 'user'
                                ? '1px solid rgba(29, 78, 216, 0.4)'
                                : '1px solid rgba(15, 23, 42, 0.08)',
                            boxShadow:
                              msg.role === 'user'
                                ? '0px 16px 32px -20px rgba(29, 78, 216, 0.7)'
                                : '0px 18px 36px -24px rgba(15, 23, 42, 0.2)',
                          }}
                        >
                          <Typography variant="body2" whiteSpace="pre-line">
                            {msg.text}
                          </Typography>

                          {msg.sources && msg.sources.length > 0 && (
                            <Box sx={{ mt: 1.5 }}>
                              <Typography
                                variant="caption"
                                sx={{ color: 'rgba(55, 65, 81, 0.7)' }}
                              >
                                Sources
                              </Typography>
                              <Stack spacing={0.5} mt={0.75}>
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
                          sx={{ mt: 0.75, display: 'block' }}
                        >
                          {msg.time}
                        </Typography>
                      </Box>
                      {msg.role === 'user' && (
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: '#e2e8f0',
                            color: '#1f2937',
                            fontSize: 13,
                          }}
                        >
                          ME
                        </Avatar>
                      )}
                    </Box>
                  </Box>
                ))}

                {loading && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: '#1f2937',
                        color: 'white',
                        fontSize: 14,
                      }}
                    >
                      IV
                    </Avatar>
                    <Paper
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                      }}
                    >
                      <CircularProgress size={16} />
                    </Paper>
                  </Box>
                )}
              </Stack>
            </Box>

            <Divider />

            <Box
              sx={{
                p: { xs: 2.5, md: 3 },
                background: 'linear-gradient(180deg, #ffffff, #f7f7f9)',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="flex-end">
                <TextField
                  fullWidth
                  placeholder="Ask a question..."
                  multiline
                  maxRows={3}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: 'white',
                    },
                  }}
                />
                <IconButton
                  color="primary"
                  onClick={handleSend}
                  disabled={!canSend}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: canSend ? '#1d4ed8' : 'rgba(29, 78, 216, 0.2)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#1e40af',
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Stack>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: 'block' }}
              >
                Press Enter to send, Shift + Enter for a new line.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </PageHelmet>
  );
};

export default AskPage;
