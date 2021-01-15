import React, { useState, useEffect } from 'react';
import {
	Card,
	Form,
	Row,
	Col,
	FormGroup,
	Button,
	Modal
} from 'react-bootstrap';
import { addNewMedia, editSong } from '../../redux/actions';
import { FileUpload } from '.';
import { useSelector, useDispatch } from 'react-redux';
import { toDate } from '../../helpers/utils';

const initials = {
	title: '',
	albumId: '',
	type: 'audio',
	mediaLink: '',
	author: '',
	actionDate: toDate()
};
const mediaTypes = ['audio'];
export const AddEditMedia = ({
	show,
	onHide,
	currentMedia = null,
	action = ''
}) => {
	const dispatch = useDispatch();
	const [newMedia, setNewMedia] = useState(initials);
	const onInputChange = ({ target }) => {
		setNewMedia({ ...newMedia, [target.name]: target.value });
	};
	const { album, media, filer, songEdit } = useSelector(
		({ album, media, filer, songEdit }) => ({
			album,
			media,
			filer,
			songEdit
		})
	);
	const { albums } = album;
	const { mediaAdding, mediaAdded } = media;
	const { coverImagePath, uploadLoading } = filer;
	const { loaded: updated } = songEdit;
	useEffect(() => {
		if (mediaAdded || updated) {
			setNewMedia(initials);
			onHide(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediaAdded, updated]);
	useEffect(() => {
		if (coverImagePath) {
			setNewMedia({ ...newMedia, mediaLink: coverImagePath });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coverImagePath]);
	useEffect(() => {
		if (currentMedia) {
			const {
				title,
				album,
				type,
				mediaLink,
				author,
				actionDate
			} = currentMedia;
			setNewMedia({
				title,
				albumId: album.id,
				type,
				mediaLink,
				author,
				actionDate: toDate(actionDate)
			});
		}
	}, [currentMedia]);
	useEffect(() => {
		if (action === 'add') {
			setNewMedia(initials);
		}
	}, [action]);
	return (
		<Modal show={show} onHide={onHide}>
			<Card>
				<Card.Header>Add media</Card.Header>
				<Card.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Media title'
							name='title'
							value={newMedia.title}
							onChange={onInputChange}
						/>
					</Form.Group>
					<Row>
						<Col>
							<FormGroup>
								<Form.Control
									as='select'
									name='type'
									value={newMedia.type}
									onChange={onInputChange}
									disabled={currentMedia}
								>
									<option>--Select type--</option>
									{mediaTypes.map((t, tIndex) => (
										<option key={tIndex} value={t}>
											{t.toUpperCase()}
										</option>
									))}
								</Form.Control>
							</FormGroup>
						</Col>
						<Col>
							<Form.Control
								as='select'
								name='albumId'
								value={newMedia.albumId}
								onChange={onInputChange}
							>
								<option>--Choose album--</option>
								{albums.map((album, albumIndex) => (
									<option key={albumIndex} value={album.id}>
										{album.name}
									</option>
								))}
							</Form.Control>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group>
								<Form.Control
									type='text'
									placeholder='Author'
									name='author'
									value={newMedia.author}
									onChange={onInputChange}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.Control
									type='date'
									placeholder='The date'
									name='actionDate'
									value={newMedia.actionDate}
									onChange={onInputChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					{newMedia.type === 'audio' && !currentMedia && (
						<FileUpload title='Select audio' />
					)}
					{newMedia.type === 'video' ? (
						<Form.Group>
							<Form.Control
								type='text'
								placeholder='Paste a Youtube link'
								name='mediaLink'
								value={newMedia.mediaLink}
								onChange={onInputChange}
							/>
						</Form.Group>
					) : null}
					{currentMedia ? (
						<Button
							disabled={mediaAdding}
							onClick={() => editSong(currentMedia.id, newMedia)}
						>
							{mediaAdding ? 'Updating,...' : `Update ${currentMedia.title}`}
						</Button>
					) : (
						<Button
							disabled={mediaAdding || uploadLoading}
							onClick={() => addNewMedia(newMedia)}
						>
							{uploadLoading
								? 'Uploading file,...'
								: mediaAdding
								? 'Saving new media'
								: 'Save'}
						</Button>
					)}
				</Card.Body>
			</Card>
		</Modal>
	);
};
