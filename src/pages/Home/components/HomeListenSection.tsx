import { useMemo, useState } from 'react';

import { ArrowOutward } from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RadioEmbed, useRadioSiteUrl } from '../../../common/components/Radio';
import { RRVAudioPlayer } from '../../../common/components/RRVAudioPlayer/RRVAudioPlayer';
import { actions, initials, type QueryHook } from '../../../redux/actions';

interface HomeListenSectionProps {
  nOfAudios?: number;
}

const eyebrowSx = {
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
} as const;

/** Home section with the live radio and the latest audios. */
export const HomeListenSection = ({
  nOfAudios = 2,
}: HomeListenSectionProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation();
  const radioSiteUrl = useRadioSiteUrl();
  const useListAudios = actions.useListAudiosQuery as QueryHook<
    APP.IAudio[],
    { page: number; pageSize: number }
  >;
  const { data } = useListAudios({ page: 1, pageSize: nOfAudios });
  const { data: audios } = data || initials.dataArr<APP.IAudio>();
  const currentAudio = useMemo(() => {
    if (audios?.length > 0) {
      const index = selectedIndex < audios.length ? selectedIndex : 0;
      return { index, audio: audios[index] };
    }
    return { index: -1, audio: null };
  }, [audios, selectedIndex]);

  return (
    <Container component="section" maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="body2"
          component="p"
          sx={{ ...eyebrowSx, color: 'primary.main', mb: 1 }}
        >
          {t('logoTitle')}
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 600 }}
        >
          {t('listenRadio')}
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* Live radio */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack
            spacing={2.5}
            sx={({ palette }) => ({
              height: '100%',
              p: { xs: 2.5, md: 3 },
              borderRadius: 3,
              color: 'common.white',
              background: `linear-gradient(160deg, ${palette.navyLight}, ${palette.navy})`,
              boxShadow: 3,
            })}
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ color: 'inherit', fontWeight: 600, mb: 1 }}
                >
                  {t('radio')}
                </Typography>
                <Tooltip title={t('listenRadio')}>
                  <IconButton
                    component="a"
                    href={radioSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t('listenRadio')}
                    size="small"
                    sx={{
                      mt: -0.5,
                      mr: -0.5,
                      color: 'rgba(255, 255, 255, 0.75)',
                      '&:hover': {
                        color: 'common.white',
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                      },
                    }}
                  >
                    <ArrowOutward fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.6 }}
              >
                {t('radioMsg')}
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 'auto',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
              }}
            >
              <RadioEmbed theme="dark" />
            </Box>
          </Stack>
        </Grid>

        {/* Latest audios */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
              {t('latestAudio')}
            </Typography>
            <RRVAudioPlayer
              audios={audios}
              currentAudio={currentAudio}
              setCurrentAudio={({ index }) => setSelectedIndex(index)}
              displayList
              displayMore
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
