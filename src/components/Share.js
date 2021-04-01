import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton
} from 'react-share';

export const Share = ({ onShare, href = '', title = '' }) => {
	return (
		<DropdownButton size='sm' title='Share'>
			<Dropdown.Item>
				<WhatsappShareButton
					hashtag={`#${title}`}
					onClick={onShare}
					quote={title}
					url={href}
				>
					<i className='fa fa-whatsapp'></i>
					WhatsApp
				</WhatsappShareButton>
			</Dropdown.Item>
			<Dropdown.Item>
				<FacebookShareButton
					hashtag={`#${title}`}
					onClick={onShare}
					quote={title}
					url={href}
				>
					<i className='fa fa-facebook'></i>
					Facebook
				</FacebookShareButton>
			</Dropdown.Item>
			<Dropdown.Item>
				<TwitterShareButton
					hashtag={`#${title}`}
					onClick={onShare}
					quote={title}
					url={href}
				>
					<i className='fa fa-twitter'></i>
					Twitter
				</TwitterShareButton>
			</Dropdown.Item>
		</DropdownButton>
	);
};
