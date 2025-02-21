import React, { useEffect, useState } from 'react';

import { Grid, Box, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVAudioPlayer } from '../../common/components/RRVAudioPlayer';
import { AudioVisualizer } from '../../common/components/RRVAudioPlayer/audioVisualizerBar';
import { useRRVAudioPlayerCtx } from '../../common/components/RRVAudioPlayer/provider';
import { RRVPagination } from '../../common/components/RRVPagination/Pagination';
import { RRVShare } from '../../common/components/RRVShare';
import { PageHelmet } from '../../common/components/wrappers';
import { useMediaQuery } from '../../common/hooks/useMediaQuery';
import { usePagination } from '../../common/hooks/usePagination';
// import { useWindowSize } from '../../common/hooks/useWindowSize';
import { useStyles } from '../../common/styles';
import { dateFormat, DL_ROUTE } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';
import SearchBar from '../components/searchBar';
// import { HomeRecentTopics } from '../Home/components/Topics';

const AudiosPage = () => {
  const { t } = useTranslation();
  const [currentAudio, setCurrentAudio] = useState({ index: -1, audio: null });
  const { isMobile } = useMediaQuery();
  const [shareSong] = actions.useShareAudioMutation();
  const { isPlaying } = useRRVAudioPlayerCtx();

  const {
    pagination: { page, pageSize, tablePage },
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination();
  const { data, isFetching } = actions.useListAudiosQuery({
    page,
    pageSize: 20,
  });
  const { data: audios, totalItems } = data || initials.dataArr;

  useEffect(() => {
    if (audios?.length > 0) {
      setCurrentAudio({ audio: audios[0], index: 0 });
    }
  }, [audios]);

  console.log({ isFetching });

  return (
    <PageHelmet title={t('topics')}>
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center" py={4}>
          <Typography variant="subtitle2" py={4}>
            {t('readOurBlog')}
          </Typography>
          <Typography variant="h1" fontWeight={800}>
            {t('teachings').toUpperCase()}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item md={3.6} sm={12} mt={8}>
            <Grid container>
              {categoriesLoading ? (
                <TopicListItemSkeleton totalItem={6} />
              ) : (
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Divider
                    orientation="vertical"
                    sx={styles.dividers}
                    flexItem
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <CategoryItem
                      category={{ id: null, name: allTopics }}
                      selectedId={selectedCategoryId}
                      onClick={handleCategoryClick}
                    />
                    {categories?.map((cat) => (
                      <CategoryItem
                        key={cat.id}
                        category={cat}
                        selectedId={selectedCategoryId}
                        onClick={handleCategoryClick}
                      />
                    ))}
                  </Box>
                </Box>
              )}
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
                dataCount={totalItems}
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
