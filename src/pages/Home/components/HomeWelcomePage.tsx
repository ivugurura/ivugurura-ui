import {
  FormatQuote as QuoteIcon,
  Radio as RadioIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { alpha, Box, Button, Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type HomeSection = 'radio' | 'youtube';

interface HomeWelcomePageProps {
  onScrollTo: (section: HomeSection) => void;
}

/** Split "verse text - Book 24:14" into its text and reference. */
const splitVerse = (verse: string) => {
  const index = verse.lastIndexOf(' - ');
  if (index === -1) return { text: verse, reference: '' };
  return {
    text: verse.slice(0, index).trim(),
    reference: verse.slice(index + 3).trim(),
  };
};

const ctaSx = {
  px: 3,
  py: 1.25,
  fontSize: '0.9375rem',
  width: { xs: '100%', sm: 'auto' },
} as const;

export const HomeWelcomePage = ({ onScrollTo }: HomeWelcomePageProps) => {
  const { t } = useTranslation();
  const { text, reference } = splitVerse(t('mathew2414'));

  return (
    <Box
      component="section"
      sx={({ palette }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: { md: 520 },
        py: { xs: 7, md: 10 },
        color: 'common.white',
        backgroundColor: palette.navy,
        backgroundImage: [
          // Darken the text side, let the photo breathe on the right.
          `linear-gradient(90deg, ${alpha(palette.navy, 0.95)} 0%, ${alpha(palette.navy, 0.8)} 45%, ${alpha(palette.navy, 0.35)} 100%)`,
          // Soft fade into the page below.
          `linear-gradient(180deg, transparent 70%, ${alpha(palette.navy, 0.6)} 100%)`,
          "url('/img/reformers.jpeg')",
        ].join(', '),
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      })}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 720 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
            <Box
              sx={{ width: 32, height: 3, borderRadius: 2, bgcolor: 'primary.main' }}
            />
            <Typography
              variant="body2"
              component="p"
              sx={{
                color: alpha('#fff', 0.85),
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {t('welcome')}
            </Typography>
          </Stack>

          <Box component="blockquote" sx={{ m: 0 }}>
            <QuoteIcon
              aria-hidden
              sx={{
                fontSize: { xs: 36, md: 44 },
                color: 'primary.light',
                opacity: 0.6,
                mb: 1,
                ml: -0.5,
              }}
            />
            <Typography
              variant="h2"
              component="p"
              sx={{
                color: 'inherit',
                fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem' },
                fontWeight: 500,
                lineHeight: 1.35,
              }}
            >
              {text}
            </Typography>
            {reference && (
              <Typography
                component="cite"
                variant="subtitle1"
                sx={{
                  display: 'block',
                  mt: 2,
                  color: 'primary.light',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                — {reference}
              </Typography>
            )}
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mt: { xs: 4, md: 5 } }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<RadioIcon />}
              onClick={() => onScrollTo('radio')}
              sx={{
                ...ctaSx,
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              {t('listenRadio')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<YouTubeIcon />}
              onClick={() => onScrollTo('youtube')}
              sx={{
                ...ctaSx,
                color: 'common.white',
                borderColor: alpha('#fff', 0.5),
                '&:hover': {
                  borderColor: 'common.white',
                  bgcolor: alpha('#fff', 0.08),
                },
              }}
            >
              {t('watch')}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
