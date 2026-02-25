import { useMemo, useState } from 'react';

import { ArrowOutward } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RadioKing } from '../../../common/components/Radio';
import { RRVAudioPlayer } from '../../../common/components/RRVAudioPlayer/RRVAudioPlayer';
import { actions, initials } from '../../../redux/apiSliceBuilder';

export const RadioHome = ({ nOfAudios = 2 }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation();
  const { data, isFetching } = actions.useListAudiosQuery({
    page: 1,
    pageSize: nOfAudios,
  });
  const { data: audios } = data || initials.dataArr();
  const currentAudio = useMemo(() => {
    if (audios?.length > 0) {
      const index = selectedIndex < audios.length ? selectedIndex : 0;
      return { index, audio: audios[index] };
    }
    return { index: -1, audio: null };
  }, [audios, selectedIndex]);

  const setCurrentAudio = ({ index }) => {
    setSelectedIndex(index);
  };
  console.log({ isFetching });

  return (
    <Box sx={{ px: { xs: 2, md: 8 } }}>
      <Box display="flex" justifyContent="center" pb={4}>
        <Typography variant="h1" fontWeight={700}>
          {t('logoTitle').toUpperCase()}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={7} xs={12}>
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
        <Grid item md={4} xs={12}>
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

        {/* <Radio /> */}
      </Grid>
    </Box>
  );
};
