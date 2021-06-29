import React from 'react';
import { Modal } from 'react-bootstrap';
import { TopicOneView } from 'components/TopicOneView';

export const TopicPreview = ({ isOpen, setIsOpen, topic = {} }) => {
	return (
		<Modal
			size='lg'
			show={isOpen}
			onHide={setIsOpen}
			aria-labelledby='topic-preview-model'
		>
			<Modal.Header closeButton>
				<Modal.Title id='topic-preview-model'>Topic preview</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<TopicOneView topic={topic} />
			</Modal.Body>
		</Modal>
	);
};
