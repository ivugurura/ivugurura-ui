import { useLang } from './providers';

/** Our own radio (radio-ui). */
export const RADIO_SITE_URL =
  (import.meta.env.VITE_RADIO_URL as string | undefined) ||
  'https://radio.reformationvoice.org';

/** The radio uses `rw` for Kinyarwanda; this site uses `kn`. */
export const toRadioLang = (lang: string) => (lang === 'kn' ? 'rw' : lang);

/** Link to the full radio page (with chat and language picker). */
export const useRadioSiteUrl = () => {
  const { lang } = useLang();
  return `${RADIO_SITE_URL}/?lang=${toRadioLang(lang)}`;
};

interface RadioEmbedProps {
  /** Match the card behind the player. */
  theme?: 'light' | 'dark';
  height?: number | string;
}

/** Live radio player, served by radio-ui's `/embed` page. */
export const RadioEmbed = ({
  theme = 'dark',
  height = 340,
}: RadioEmbedProps) => {
  const { lang } = useLang();

  return (
    <iframe
      title="Radio player"
      allow="autoplay"
      loading="lazy"
      src={`${RADIO_SITE_URL}/embed?lang=${toRadioLang(lang)}&theme=${theme}`}
      style={{
        display: 'block',
        width: '100%',
        height,
        border: 'none',
        // Must match the embed page's scheme (always light, whatever its
        // palette), or the browser paints an opaque box behind the page.
        colorScheme: 'light',
        background: 'transparent',
      }}
    />
  );
};
