import React, { useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
	Card,
	Button,
	FormControl,
	Row,
	Col,
	Container
} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import { systemLanguages, topicEditorButtons } from '../utils/constants';
import { useSelector } from 'react-redux';
import { getCategories } from '../redux/actions';
// import { FileUploader } from '../components';
import {
	addTopic,
	getTopicDetail,
	resetTopicAction,
	updateTopic
} from '../redux/actions/topics';
import { toast } from 'react-toastify';
import { uploadedFile } from '../helpers/utils';
import { Page } from '../components';

const topicValues = {
	title: '',
	categoryId: '',
	description: '',
	coverImage: ''
};
export const AddEditTopic = ({ history, match }) => {
	const systemLanguage = localStorage.getItem('lang');
	const { lang } = systemLanguages.find((lang) => lang.abbr === systemLanguage);
	const { topicSlug } = match.params;
	const [topic, setTopic] = useState(topicValues);
	const [sunEdContent, setSunEdContent] = useState('');
	const [uploading, setUploading] = useState(false);
	const [hasUploaded, setHasUploaded] = useState(false);
	const [file, setFile] = useState(null);
	const { category, topicGet, topicAdd, topicEdit } = useSelector(
		({ category, topicGet, topicAdd, topicEdit }) => ({
			category,
			topicGet,
			topicAdd,
			topicEdit
		})
	);

	useEffect(() => {
		getCategories('/');
	}, []);
	useEffect(() => {
		if (topicAdd.done || topicEdit.done) {
			setSunEdContent('');
			setTopic(topicValues);
			toast(`${topic.title.toUpperCase()} has saved`);

			const actionType = topicAdd.done ? 'add' : 'edit';
			resetTopicAction(actionType);

			setTimeout(() => {
				history.goBack();
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [topicAdd.done, topicEdit.done]);
	useEffect(() => {
		if (topicSlug) {
			getTopicDetail(topicSlug);
		}
	}, [topicSlug]);
	useEffect(() => {
		if (topicSlug && topicGet.done) {
			const {
				title,
				description,
				categoryId,
				content,
				coverImage
			} = topicGet.topic;
			setTopic({ title, description, categoryId, coverImage });
			setHasUploaded(true);
			setSunEdContent(content);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [topicSlug, topicGet.done]);
	const onInputChange = ({ target }) => {
		setTopic({ ...topic, [target.name]: target.value });
	};
	const onSaveChange = async () => {
		topic.content = sunEdContent;
		if (!hasUploaded) {
			if (!file) {
				return toast('Please select image', { type: toast.TYPE.ERROR });
			}
			setUploading(true);
			const prevFile = topicSlug ? topic.coverImage : '';
			const imagePath = await uploadedFile(file, prevFile);
			if (imagePath) {
				setHasUploaded(true);
				setUploading(false);
				topic.coverImage = imagePath;
			}
		}
		if (topicSlug) {
			updateTopic(topic, topicSlug);
		} else {
			addTopic(topic);
		}
	};
	return (
		<Page title='Add/edit post'>
			<Container fluid className='mt-2'>
				<Row>
					<Col md={8}>
						<h4 className='text-center'>
							{topicSlug
								? topicGet.loading
									? 'LOADING...'
									: `Update ${topicGet.topic.title}`
								: `Add topic or PAST IT HERE`}
						</h4>
					</Col>
					<Col md={4}>
						<h4 className='text-info pull-right'>{`=>${lang}`}</h4>
					</Col>
				</Row>
				<Card>
					<Card.Header>
						<Card.Title>
							<Row>
								<Col xs={12} md={3} lg={3}>
									<FormControl
										type='text'
										placeholder='Topic title'
										name='title'
										value={topic.title}
										onChange={onInputChange}
									/>
								</Col>
								<Col xs={12} md={3} lg={3}>
									<FormControl
										as='select'
										name='categoryId'
										value={topic.categoryId}
										onChange={onInputChange}
									>
										<option>Select category</option>
										{category.loading ? (
											<option>Loading</option>
										) : (
											category.categories.map((category, categoryIndex) => (
												<option key={categoryIndex} value={category.id}>
													{category.name}
												</option>
											))
										)}
									</FormControl>
								</Col>
								<Col xs={12} md={6} lg={6}>
									<FormControl
										type='text'
										placeholder='Topic description'
										name='description'
										value={topic.description}
										onChange={onInputChange}
									/>
								</Col>
							</Row>
						</Card.Title>
					</Card.Header>
					<Card.Body>
						<Row>
							<Col xs={12} md={9} lg={9}>
								<SunEditor
									setOptions={{
										height: 230,
										buttonList: topicEditorButtons
									}}
									setDefaultStyle='font-size: 16px;'
									name='content'
									value={topic.content}
									setContents={sunEdContent}
									placeholder='Please type here...'
									onChange={(content) => setSunEdContent(content)}
								/>
							</Col>
							<Col xs={12} md={3} lg={3}>
								{/* <FileUploader coverImage={topic.coverImage} /> */}
								<Row>
									{!hasUploaded ? (
										<Col xs={12} md={12} lg={12}>
											<ImageUploader
												withIcon
												buttonText='Choose images'
												imgExtension={['.jpg', '.gif', '.png', '.gif']}
												withPreview
												withLabel
												singleImage
												maxFileSize={5242880}
												onChange={(images) => setFile(images[0])}
											/>
										</Col>
									) : (
										<Col xs={12} md={12} lg={12}>
											<div className='text-center'>
												<Button onClick={() => setHasUploaded(false)}>
													Change cover image?
												</Button>
												<img
													src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
													className='img-fluid img-thumbnail'
													alt='Topic cover'
												/>
											</div>
										</Col>
									)}
								</Row>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer>
						<Button
							variant='outline-secondary'
							onClick={() => history.goBack()}
						>
							Cancel
						</Button>
						{topicSlug ? (
							<Button
								variant='primary'
								onClick={onSaveChange}
								disabled={uploading || topicEdit.loading}
							>
								{topicEdit.loading
									? 'Saving... Please wait'
									: `Update ${topic.title}`}
							</Button>
						) : (
							<Button
								variant='primary'
								onClick={onSaveChange}
								disabled={uploading || topicAdd.loading}
							>
								{uploading
									? 'Uploading cover image,...'
									: topicAdd.loading
									? 'Saving... Please wait'
									: 'Save topic'}
							</Button>
						)}
					</Card.Footer>
				</Card>
			</Container>
		</Page>
	);
};
export default AddEditTopic;
