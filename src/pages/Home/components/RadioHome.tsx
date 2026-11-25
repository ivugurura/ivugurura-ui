import { useMemo, useState } from 'react';

import { ArrowOutward } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RadioKing } from '../../../common/components/Radio';
import { RRVAudioPlayer } from '../../../common/components/RRVAudioPlayer/RRVAudioPlayer';
import { actions, initials, type QueryHook } from '../../../redux/actions';

interface RadioHomeProps {
  nOfAudios?: number;
}

export const RadioHome = ({ nOfAudios = 2 }: RadioHomeProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation();
  const useListAudios = actions.useListAudiosQuery as QueryHook<
    APP.IAudio[],
    { page: number; pageSize: number }
  >;
  const { data } = useListAudios({
    page: 1,
    pageSize: nOfAudios,
  });
  const { data: audios } = data || initials.dataArr<APP.IAudio>();
  const currentAudio = useMemo(() => {
    if (audios?.length > 0) {
      const index = selectedIndex < audios.length ? selectedIndex : 0;
      return { index, audio: audios[index] };
    }
    return { index: -1, audio: null };
  }, [audios, selectedIndex]);

  const setCurrentAudio = ({ index }: { index: number }) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ px: { xs: 2, md: 8 } }}>
      <Box display="flex" justifyContent="center" pb={4}>
        <Typography variant="h1" fontWeight={700}>
          {t('logoTitle').toUpperCase()}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h2" fontWeight={700} pb={4}>
            {t('latestAudio')}
          </Typography>
          <RRVAudioPlayer
            audios={audios}
            currentAudio={currentAudio}
            setCurrentAudio={setCurrentAudio}
            displayList
            displayMore
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h2" fontWeight={700} pb={4}>
            {t('radio')}
          </Typography>
          <RadioKing />
          <Box>
            {t('radioMsg')}
            <Button endIcon={<ArrowOutward fontSize="small" />}>
              {t('listenRadio')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
