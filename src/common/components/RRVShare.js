import React from 'react';

import {
  Facebook as FacebookIcon,
  WhatsApp as WhatsAppIcon,
  Twitter as TwitterIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
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
}) => {
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
      buttonProps={{ startIcon: <ShareIcon /> }}
      title={displayText && 'Share'}
      options={shareOptions}
    />
  );
};
