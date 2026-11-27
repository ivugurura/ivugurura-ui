import { useMemo, useState } from 'react';

import { PlayArrowRounded, YouTube as YouTubeIcon } from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  ButtonBase,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { useLang } from '../../../common/components/providers';
import { getYtbDefaultVideoId } from '../../../helpers/utils';
import { actions, initials, type QueryHook } from '../../../redux/actions';

/** The parts of a YouTube Data API `search` item that we use. */
interface YoutubeItem {
  id: { videoId: string };
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails?: Record<string, { url: string } | undefined>;
  };
}

interface YoutubeSearch {
  items?: YoutubeItem[];
}

interface Video {
  id: string;
  title: string;
  publishedAt?: string;
  thumbnail: string;
}

/** Channels per language; must match the API's `getYtbChannelId`. */
const CHANNEL_IDS: Record<string, string> = {
  kn: 'UCCzVYqdLwgNMLMsP-NKNnIQ',
  en: 'UCZe_Rjl4AGMtutq8UeQLuag',
};

const channelUrl = (lang: string) =>
  `https://www.youtube.com/channel/${CHANNEL_IDS[lang] ?? CHANNEL_IDS.en}`;

const thumbnailOf = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** The API returns titles with HTML entities (e.g. `&#39;`). */
const decodeEntities = (value: string) =>
  new DOMParser().parseFromString(value, 'text/html').documentElement
    .textContent ?? value;

const toVideo = ({ id, snippet }: YoutubeItem): Video => ({
  id: id.videoId,
  title: decodeEntities(snippet.title),
  publishedAt: snippet.publishedAt,
  thumbnail:
    snippet.thumbnails?.high?.url ??
    snippet.thumbnails?.medium?.url ??
    thumbnailOf(id.videoId),
});

const clamp = (lines: number) =>
  ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }) as const;

const muted = 'rgba(255, 255, 255, 0.65)';

/** 16:9 player that shows the poster until clicked, then loads YouTube. */
const FeaturedPlayer = ({
  video,
  playing,
  onPlay,
}: {
  video: Video;
  playing: boolean;
  onPlay: () => void;
}) => (
  <Box
    sx={{
      position: 'relative',
      aspectRatio: '16 / 9',
      borderRadius: 3,
      overflow: 'hidden',
      bgcolor: 'common.black',
      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
    }}
  >
    {playing ? (
      <Box
        component="iframe"
        title={video.title}
        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sx={{ position: 'absolute', inset: 0, width: 1, height: 1, border: 0 }}
      />
    ) : (
      <ButtonBase
        onClick={onPlay}
        aria-label={video.title}
        sx={{
          position: 'absolute',
          inset: 0,
          '& img': { transition: 'transform 0.5s ease' },
          '&:hover img': { transform: 'scale(1.03)' },
          '&:hover .play': { transform: 'scale(1.08)' },
        }}
      >
        <Box
          component="img"
          src={video.thumbnail}
          alt=""
          sx={{ width: 1, height: 1, objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <Box
          className="play"
          sx={{
            position: 'absolute',
            width: { xs: 64, md: 84 },
            height: { xs: 64, md: 84 },
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'primary.main',
            color: 'common.white',
            boxShadow: ({ palette }) =>
              `0 0 0 10px ${alpha(palette.primary.main, 0.25)}`,
            transition: 'transform 0.2s ease',
          }}
        >
          <PlayArrowRounded sx={{ fontSize: { xs: 40, md: 52 } }} />
        </Box>
      </ButtonBase>
    )}
  </Box>
);

const PlaylistItem = ({
  video,
  active,
  onSelect,
}: {
  video: Video;
  active: boolean;
  onSelect: () => void;
}) => (
  <ButtonBase
    onClick={onSelect}
    aria-current={active || undefined}
    sx={{
      width: 1,
      p: 1,
      gap: 1.5,
      borderRadius: 2,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      textAlign: 'left',
      bgcolor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
      transition: 'background-color 0.2s ease',
      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.06)' },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        flexShrink: 0,
        width: { xs: 128, md: 136 },
        aspectRatio: '16 / 9',
        borderRadius: 1.5,
        overflow: 'hidden',
        bgcolor: 'rgba(255, 255, 255, 0.08)',
        outline: active ? '2px solid' : 'none',
        outlineColor: 'primary.main',
      }}
    >
      <Box
        component="img"
        src={video.thumbnail}
        alt=""
        loading="lazy"
        sx={{ width: 1, height: 1, objectFit: 'cover', display: 'block' }}
      />
      {active && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.45)',
            color: 'common.white',
          }}
        >
          <PlayArrowRounded />
        </Box>
      )}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="body1"
        sx={{
          color: 'common.white',
          fontWeight: active ? 600 : 500,
          lineHeight: 1.4,
          ...clamp(2),
        }}
      >
        {video.title}
      </Typography>
      {video.publishedAt && (
        <Typography variant="body2" sx={{ color: muted, mt: 0.5 }}>
          {moment(video.publishedAt).format('DD MMM YYYY')}
        </Typography>
      )}
    </Box>
  </ButtonBase>
);

export const HomeYoutube = () => {
  const { t } = useTranslation();
  const { lang } = useLang();
  const useListYoutubes = actions.useListYoutubesQuery as QueryHook<
    YoutubeSearch,
    void
  >;
  const { data, isFetching } = useListYoutubes();
  const { data: search } = data || initials.dataObj<YoutubeSearch>();

  const videos = useMemo<Video[]>(() => {
    const items = (search?.items ?? []).filter((item) => item.id?.videoId);
    if (items.length > 0) return items.map(toVideo);
    const fallbackId: string = (
      getYtbDefaultVideoId as (lang: string) => string
    )(lang);
    return [
      {
        id: fallbackId,
        title: t('watchLatest'),
        thumbnail: thumbnailOf(fallbackId),
      },
    ];
  }, [search, lang, t]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const current = videos.find((video) => video.id === selectedId) ?? videos[0];
  const hasPlaylist = videos.length > 1;

  const select = (id: string) => {
    setSelectedId(id);
    setPlaying(true);
  };

  return (
    <Box
      component="section"
      sx={({ palette }) => ({
        color: 'common.white',
        background: `radial-gradient(120% 90% at 15% 0%, ${palette.navyLight} 0%, ${palette.navy} 60%)`,
      })}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 2,
            mb: { xs: 3, md: 4 },
          }}
        >
          <Box>
            <Typography
              variant="body2"
              component="p"
              sx={{
                color: 'primary.light',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                mb: 1,
              }}
            >
              {t('watchListen')}
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                color: 'inherit',
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
              }}
            >
              {t('watchLatest')}
            </Typography>
          </Box>
          <Button
            href={channelUrl(lang)}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            startIcon={<YouTubeIcon />}
            sx={{
              flexShrink: 0,
              display: { xs: 'none', sm: 'inline-flex' },
              color: 'common.white',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                borderColor: 'common.white',
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            YouTube
          </Button>
        </Stack>

        {isFetching ? (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Skeleton
                variant="rounded"
                sx={{
                  aspectRatio: '16 / 9',
                  height: 'auto',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  borderRadius: 3,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1.5}>
                {[0, 1, 2, 3].map((key) => (
                  <Skeleton
                    key={key}
                    variant="rounded"
                    height={76}
                    sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            sx={{ justifyContent: 'center' }}
          >
            <Grid size={{ xs: 12, md: hasPlaylist ? 8 : 10 }}>
              <FeaturedPlayer
                key={current.id}
                video={current}
                playing={playing}
                onPlay={() => setPlaying(true)}
              />
              {hasPlaylist && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ color: 'inherit', fontWeight: 600, ...clamp(2) }}
                  >
                    {current.title}
                  </Typography>
                  {current.publishedAt && (
                    <Typography variant="body2" sx={{ color: muted, mt: 0.5 }}>
                      {moment(current.publishedAt).format('DD MMMM YYYY')}
                    </Typography>
                  )}
                </Box>
              )}
            </Grid>
            {hasPlaylist && (
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack
                  spacing={0.5}
                  sx={{
                    mx: -1,
                    maxHeight: { md: 500 },
                    overflowY: { md: 'auto' },
                  }}
                >
                  {videos.map((video) => (
                    <PlaylistItem
                      key={video.id}
                      video={video}
                      active={video.id === current.id}
                      onSelect={() => select(video.id)}
                    />
                  ))}
                </Stack>
              </Grid>
            )}
          </Grid>
        )}

        <Button
          href={channelUrl(lang)}
          target="_blank"
          rel="noreferrer"
          variant="outlined"
          fullWidth
          startIcon={<YouTubeIcon />}
          sx={{
            mt: 3,
            display: { sm: 'none' },
            color: 'common.white',
            borderColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          YouTube
        </Button>
      </Container>
    </Box>
  );
};
