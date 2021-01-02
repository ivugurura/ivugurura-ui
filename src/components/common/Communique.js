import React from 'react';
import MarqueeText from 'react-marquee-text-component';
import { Alert, Container } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import { getPublishedCommunique } from '../../redux/actions';
import { useTranslation } from 'react-i18next';

export const Communique = () => {
	const { t } = useTranslation();
	// const { communique } = useSelector(({ communiquePub }) => communiquePub);
	// useEffect(() => {
	// 	getPublishedCommunique();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	const communique = {
		content: t('app:communique')
	};
	return (
		<Container fluid className='mt-2'>
			{communique ? (
				<Alert variant='success'>
					<h4>
						<MarqueeText text={communique.content} repeat={1} />
					</h4>
				</Alert>
			) : null}
		</Container>
	);
};
