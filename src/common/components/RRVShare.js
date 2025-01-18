import React from 'react';

import {
  Facebook as FacebookIcon,
  WhatsApp as WhatsAppIcon,
  Twitter as TwitterIcon,
  ShareOutlined,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import { RRVDropdown } from './RRVDropdown';

export const RRVShare = ({
  onShare,
  href = '',
  title = '',
  displayText = true,
  color,
}) => {
  const { t } = useTranslation();
  const shareOptions = [
    {
      wrapper: WhatsappShareButton,
      startIcon: WhatsAppIcon,
      title: 'WhatsApp',
    },
    {
      wrapper: FacebookShareButton,
      startIcon: FacebookIcon,
      title: 'Facebook',
    },
    { wrapper: TwitterShareButton, startIcon: TwitterIcon, title: 'Twitter' },
  ].map(
    ({ wrapper: ShareWrapper, startIcon: StartIcon, title: shareTitle }) => (
      <ShareWrapper
        hashtag={`#${title}`}
        onClick={onShare}
        quote={title}
        url={href}
        key={title}
      >
        <StartIcon /> {shareTitle}
      </ShareWrapper>
    ),
  );
  return (
    <RRVDropdown
      buttonProps={{
        startIcon: displayText && <ShareOutlined sx={{ color }} />,
      }}
      title={displayText && t('actions.share')}
      options={shareOptions}
      variant="text"
      share
    />
  );
};
