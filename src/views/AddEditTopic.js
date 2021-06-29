import React, { useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
	Card,
	Button,
	FormControl,
	Row,
	Col,
	Container,
	Image
} from 'react-bootstrap';
import {
	IMAGE_PATH,
	systemLanguages,
	topicEditorButtons
} from '../utils/constants';
import { useSelector } from 'react-redux';
import { getCategories, setFilePath } from '../redux/actions';
// import { FileUploader } from '../components';
import {
	addTopic,
	getTopicDetail,
	resetTopicAction,
	updateTopic
} from '../redux/actions/topics';
import { toast } from 'react-toastify';
import { Page } from '../components';
import { TopicCoverImage } from 'components/TopicCoverImage';
import { TopicPreview } from 'components/models/TopicPreview';

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
	const [isCoverImageOpen, setIsCoverImageOpen] = useState(false);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [sunEdContent, setSunEdContent] = useState('');
	const { category, topicGet, topicAdd, topicEdit, filePath } = useSelector(
		(state) => state
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
			const { title, description, categoryId, content, coverImage } =
				topicGet.topic;
			setTopic({ title, description, categoryId, coverImage });
			// setHasUploaded(true);
			setFilePath(coverImage);
			setSunEdContent(content);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [topicSlug, topicGet.done]);
	const onInputChange = ({ target }) => {
		setTopic({ ...topic, [target.name]: target.value });
	};
	const onSaveChange = async () => {
		topic.content = sunEdContent;
		topic.coverImage = filePath.filePathName || topic.coverImage;
		if (!topic.coverImage) {
			return toast('Please select cover image', { type: toast.TYPE.ERROR });
		}

		if (topicSlug) {
			updateTopic(topic, topicSlug);
		} else {
			addTopic(topic);
		}
	};
	const openOpenPreview = () => {
		topic.content = sunEdContent;
		topic.coverImage = filePath.filePathName || topic.coverImage;
		setIsPreviewOpen(true);
	};
	return (
		<Page title='Add/edit post'>
			<TopicCoverImage
				isOpen={isCoverImageOpen}
				setIsOpen={() => setIsCoverImageOpen(false)}
			/>
			<TopicPreview
				isOpen={isPreviewOpen}
				setIsOpen={() => setIsPreviewOpen(false)}
				topic={topic}
			/>
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
								<Button
									variant='outline-primary'
									onClick={() => setIsCoverImageOpen(true)}
								>
									{Boolean(filePath.filePathName) || Boolean(topic.coverImage)
										? 'Change the image'
										: 'Select cover image'}
								</Button>
								{(Boolean(filePath.filePathName) ||
									Boolean(topic.coverImage)) && (
									<Image
										src={`${IMAGE_PATH}/${
											filePath.filePathName || topic.coverImage
										}`}
										thumbnail
									/>
								)}
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
								disabled={topicEdit.loading}
							>
								{topicEdit.loading
									? 'Saving... Please wait'
									: `Update ${topic.title}`}
							</Button>
						) : (
							<Button
								variant='primary'
								onClick={onSaveChange}
								disabled={topicAdd.loading}
							>
								{topicAdd.loading ? 'Saving... Please wait' : 'Save topic'}
							</Button>
						)}
						<Button
							variant='outline-info'
							onClick={() => openOpenPreview()}
							className='pull-right'
						>
							Preview
						</Button>
					</Card.Footer>
				</Card>
			</Container>
		</Page>
	);
};
export default AddEditTopic;
