import React, { useEffect } from 'react';
import moment from 'moment';
import Masonry from 'react-masonry-css';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Loading } from 'components/common';
import { getCoverImages, setFilePath } from 'redux/actions';
import { IMAGE_PATH } from 'utils/constants';
import './masonry.css';

export const CoverImages = () => {
	const {
		coverImagesGet: { loading, coverImages },
		filePath: { filePathName }
	} = useSelector((state) => state);
	useEffect(() => {
		getCoverImages();
	}, []);
	return loading && !coverImages.length ? (
		<Loading />
	) : coverImages.length ? (
		<Masonry
			breakpointCols={3}
			className='my-masonry-grid'
			columnClassName='my-masonry-grid_column'
		>
			{coverImages.map((img, imgIdx) => (
				<Card
					className={`bg-dark text-${
						filePathName === img.fileName ? 'red' : 'white'
					}`}
					key={imgIdx}
					onClick={() => setFilePath(img.fileName)}
				>
					<Card.Img src={`${IMAGE_PATH}/${img.fileName}`} alt='Card image' />
					<Card.ImgOverlay>
						<Card.Text>
							{filePathName === img.fileName
								? 'Selected'
								: `Uploded at ${moment(img.createdAt).format('MMMM Do YYYY')}`}
						</Card.Text>
					</Card.ImgOverlay>
				</Card>
			))}
		</Masonry>
	) : (
		<Card.Text>No cover images uploaded yet</Card.Text>
	);
};
