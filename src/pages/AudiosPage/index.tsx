import React, { useEffect, useState } from 'react';

import { FileDownloadOutlined, Pause, PlayArrow } from '@mui/icons-material';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '../../common/components/PageHeader';
import { RRVAudioPlayer } from '../../common/components/RRVAudioPlayer';
import { AudioVisualizer } from '../../common/components/RRVAudioPlayer/audioVisualizerBar';
import { useRRVAudioPlayerCtx } from '../../common/components/RRVAudioPlayer/provider';
import { RRVPagination } from '../../common/components/RRVPagination/Pagination';
import { RRVShare } from '../../common/components/RRVShare';
import { PageHelmet } from '../../common/components/wrappers';
import { useMediaQuery } from '../../common/hooks/useMediaQuery';
import { usePagination } from '../../common/hooks/usePagination';
import { useStyles } from '../../common/styles';
import { dateFormat, DL_ROUTE } from '../../helpers/utils/constants';
import {
  actions,
  initials,
  type MutationHook,
  type QueryHook,
} from '../../redux/actions';
import SearchBar from '../components/SearchBar2';

interface CurrentAudio {
  index: number;
  audio: APP.IAudio | null;
}

const AudiosPage = () => {
  const { t } = useTranslation();
  const [currentAudio, setCurrentAudio] = useState<CurrentAudio>({
    index: -1,
    audio: null,
  });
  const { isMobile } = useMediaQuery();
  const useShareAudio = actions.useShareAudioMutation as MutationHook<
    unknown,
    { slug: string }
  >;
  const useListAudios = actions.useListAudiosQuery as QueryHook<
    APP.IAudio[],
    { page: number; pageSize: number }
  >;
  const [shareSong] = useShareAudio();
  const { isPlaying } = useRRVAudioPlayerCtx();

  const {
    pagination: { page, pageSize, tablePage },
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination();
  const { data } = useListAudios({
    page,
    pageSize: 20,
  });
  const { data: audios, totalItems } = data || initials.dataArr<APP.IAudio>();

  useEffect(() => {
    if (audios?.length > 0) {
      setCurrentAudio({ audio: audios[0], index: 0 });
    }
  }, [audios]);

  return (
    <PageHelmet title={t('audios')}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box px={8}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              py={4}
            >
              <PageHeader
                title={t('audio').toUpperCase()}
                description={t('listenAudio').toUpperCase()}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }} sx={useStyles.cardContainer}>
                {currentAudio.audio && (
                  <RRVAudioPlayer
                    audios={audios}
                    currentAudio={currentAudio}
                    setCurrentAudio={setCurrentAudio}
                  />
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 7.8 }}>
                <SearchBar />
                <List>
                  {audios?.map((audio, index) => {
                    const isCurrent = audio.id === currentAudio.audio?.id;
                    return (
                      <React.Fragment key={audio.id}>
                        <ListItem
                          onClick={() => setCurrentAudio({ audio, index })}
                          sx={{
                            ...useStyles.listItem,
                            ...(isCurrent && useStyles.selectedListItem),
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: { xs: 2, sm: 0 },
                          }}
                          key={audio.id}
                          secondaryAction={
                            <Box
                              display="flex"
                              flexDirection={{ xs: 'column', sm: 'row' }}
                              alignItems="center"
                              gap={1}
                            >
                              <IconButton
                                onClick={() =>
                                  setCurrentAudio({ audio, index })
                                }
                                sx={useStyles.listIcon}
                              >
                                {isCurrent && isPlaying ? (
                                  <Pause />
                                ) : (
                                  <PlayArrow />
                                )}
                              </IconButton>

                              <IconButton
                                target="_blank"
                                rel="noreferrer"
                                href={DL_ROUTE + audio.slug}
                              >
                                <FileDownloadOutlined
                                  sx={useStyles.listIcon}
                                  fontSize="small"
                                />
                              </IconButton>
                              <RRVShare
                                title={audio.title}
                                href={DL_ROUTE + audio.slug}
                                onShare={() => shareSong({ slug: audio.slug })}
                              />
                            </Box>
                          }
                          alignItems="flex-start"
                        >
                          <ListItemIcon
                            sx={{ minWidth: isMobile ? undefined : '56px' }}
                          >
                            <AudioVisualizer
                              isPlaying={isPlaying && isCurrent}
                            />
                          </ListItemIcon>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              alignItems: { xs: 'flex-start', sm: 'center' },
                              width: '100%',
                              gap: 2,
                            }}
                          >
                            <ListItemText
                              primary={audio.title}
                              secondary={
                                <p>
                                  {t('by')} {audio.author}
                                </p>
                              }
                              sx={{ flex: 0.5 }}
                            />
                            <Typography variant="subtitle2">
                              {dateFormat(audio.createdAt)}
                            </Typography>
                          </Box>
                        </ListItem>
                        <Divider component="li" />
                      </React.Fragment>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <RRVPagination
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                dataCount={totalItems ?? 0}
                page={tablePage}
                pageSize={pageSize}
                labelRowsPerPage="N audios per page:"
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </PageHelmet>
  );
};

export default AudiosPage;
