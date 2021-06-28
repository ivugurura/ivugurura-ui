import React, { useState } from 'react';
import { FileUpload } from 'components/models';
import { Modal, Tab, Tabs, Button } from 'react-bootstrap';
import { CoverImages } from './CoverImages';

export const TopicCoverImage = ({ isOpen = false, setIsOpen }) => {
	const [key, setKey] = useState('upload');

	return (
		<Modal
			size='lg'
			show={isOpen}
			onHide={setIsOpen}
			aria-labelledby='upload-topic-image-model'
		>
			<Modal.Header closeButton>
				<Modal.Title id='upload-topic-image-model'>
					Select or upload a cover image for a topic
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Tabs
					activeKey={key}
					onSelect={(k) => setKey(k)}
					id='upload-select-tab'
				>
					<Tab eventKey='upload' title='Upload from your computer'>
						<FileUpload title='' type='image' />
					</Tab>
					<Tab eventKey='current' title='Choose from the uploaded images'>
						<CoverImages />
					</Tab>
				</Tabs>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={setIsOpen}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
