import React from 'react';

import {
  Facebook as FacebookIcon,
  WhatsApp as WhatsAppIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import { RRVDropdown } from './RRVDropdown';

export const RRVShare = ({ onShare, href = '', title = '' }) => {
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
    ({ wrapper: ShareWrapper, startIcon: ShareIcon, title: shareTitle }) => (
      <ShareWrapper
        hashtag={`#${title}`}
        onClick={onShare}
        quote={title}
        url={href}
        key={title}
      >
        <ShareIcon /> {shareTitle}
      </ShareWrapper>
    ),
  );
  return <RRVDropdown title="Share" options={shareOptions} />;
};
