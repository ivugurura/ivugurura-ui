import React, { useEffect, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { addTopicComment, resetAddComment } from 'redux/actions';

export const commentInitialValues = {
	names: '',
	email: '',
	website: '',
	content: ''
};
export const CommentaryForm = ({ slug }) => {
	const { t } = useTranslation();
	const [commentary, setCommentary] = useState(commentInitialValues);
	const { commentLoading, commentAdded } = useSelector(
		({ comment }) => comment
	);
	useEffect(() => {
		if (commentAdded) {
			setCommentary(commentInitialValues);
			resetAddComment();
			toast(t('app:commentSuccess'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [commentAdded]);
	const handleChange = ({ target: { name, value } }) => {
		setCommentary({ ...commentary, [name]: value });
	};
	return (
		<Form>
			<hr />
			<h4 className='text-center text-info'>{t('app:leaveComment')}</h4>
			<p className='text-muted'>{t('app:notEmailPublish')}</p>
			<Form.Group controlId='validationContent'>
				<Form.Control
					as='textarea'
					rows='3'
					placeholder='Comment'
					name='content'
					value={commentary.content}
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Row className='mt-2'>
				<Form.Group as={Col} md='4' controlId='validationNames'>
					<Form.Control
						type='text'
						placeholder='Names'
						name='names'
						value={commentary.names}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group as={Col} md='4' controlId='validationFormik02'>
					<Form.Control
						type='text'
						placeholder='E-mail'
						name='email'
						value={commentary.email}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group as={Col} md='4' controlId='validationFormikUsername'>
					<Form.Control
						type='text'
						placeholder='Website'
						name='website'
						value={commentary.website}
						onChange={handleChange}
					/>
				</Form.Group>
			</Form.Row>
			<Button
				variant='primary'
				type='submit'
				disabled={commentLoading || commentAdded}
				onClick={() => addTopicComment(commentary, slug)}
			>
				{commentLoading ? 'Sending comment,...' : t('app:btnSend')}
			</Button>
		</Form>
	);
};
