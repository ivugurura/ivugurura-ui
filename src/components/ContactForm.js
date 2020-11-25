import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { textStyles } from '../utils/styles';
import { sendContactUs } from '../redux/actions';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const initialValues = { names: '', email: '', message: '' };
export const ContactForm = () => {
	const { t } = useTranslation();
	const [formValues, setFormValues] = useState(initialValues);
	const { loading, loaded, message } = useSelector(
		({ contactUs }) => contactUs
	);
	useEffect(() => {
		if (loaded && message) {
			setFormValues(initialValues);
			toast(message);
		}
	}, [message, loaded]);
	const handleChange = ({ target: { name, value } }) => {
		setFormValues({ ...formValues, [name]: value });
	};
	return (
		<Card.Body>
			<Card.Title style={textStyles.textFtTitle}>
				{t('app:contactUs')}
			</Card.Title>
			<Form.Control
				className='mb-2'
				type='text'
				name='names'
				placeholder='Names'
				value={formValues.names}
				onChange={handleChange}
			/>
			<Form.Control
				className='mb-2'
				type='text'
				name='email'
				placeholder='Email'
				value={formValues.email}
				onChange={handleChange}
			/>
			<Form.Control
				as='textarea'
				rows='3'
				className='mb-2'
				type='text'
				name='message'
				placeholder='Message'
				value={formValues.message}
				onChange={handleChange}
			/>
			<Button
				disabled={loading || loaded}
				onClick={() => sendContactUs(formValues)}
			>
				{loading ? 'Sending message' : loaded ? 'Message sent' : 'Send'}
			</Button>
		</Card.Body>
	);
};
