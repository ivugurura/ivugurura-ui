import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { addUser, editUser, getSystemUsers } from '../../redux/actions';
import { useSelector } from 'react-redux';

const initials = {
	names: '',
	username: '',
	email: '',
	password: '',
	role: 3,
	isActive: false
};
const userRoles = [
	{ id: 2, name: 'Admin' },
	{ id: 3, name: 'Editor' }
];
export const AddEditUser = ({
	show,
	onHide,
	currentUser = null,
	action = ''
}) => {
	const [newUser, setNewUser] = useState(initials);
	const onInputChange = ({ target: { name, value, checked } }) => {
		const inputValue = name === 'isActive' ? checked : value;
		setNewUser({ ...newUser, [name]: inputValue });
	};
	const {
		userAdd: { loading, done },
		userEdit: { loading: editing, done: edited }
	} = useSelector(({ userAdd, userEdit }) => ({
		userAdd,
		userEdit
	}));
	useEffect(() => {
		if (done || edited) {
			setNewUser(initials);
			onHide(true);
			getSystemUsers({});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [done, edited]);
	useEffect(() => {
		if (currentUser) {
			const { names, username, email, role, isActive } = currentUser;
			setNewUser({
				names,
				username,
				email,
				password: '',
				role,
				isActive
			});
		}
	}, [currentUser]);
	useEffect(() => {
		if (action === 'add') {
			setNewUser(initials);
		}
	}, [action]);
	return (
		<Modal show={show} onHide={onHide}>
			<Card>
				<Card.Header>
					{currentUser
						? `Edit ${currentUser.names.toUpperCase()}`
						: 'Add a new user'}
				</Card.Header>
				<Card.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='User full name (First and last name)'
							name='names'
							value={newUser.names}
							onChange={onInputChange}
						/>
						<Form.Check
							type='switch'
							id='isActive'
							name='isActive'
							checked={newUser.isActive}
							label='Is active'
							onChange={onInputChange}
						/>
					</Form.Group>
					<Row>
						<Col>
							<Form.Group>
								<Form.Control
									type='text'
									placeholder='User name(with no spaces)'
									name='username'
									value={newUser.username}
									onChange={onInputChange}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.Control
									type='email'
									placeholder='Email'
									name='email'
									value={newUser.email}
									onChange={onInputChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group>
								<Form.Control
									as='select'
									name='role'
									value={newUser.role}
									onChange={onInputChange}
								>
									<option>--Select role--</option>
									{userRoles.map(({ id, name }, tIndex) => (
										<option key={tIndex} value={id}>
											{name.toUpperCase()}
										</option>
									))}
								</Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.Control
									type='text'
									placeholder={
										currentUser ? 'Edit password' : 'Set user password'
									}
									name='password'
									value={newUser.password}
									onChange={onInputChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					{currentUser ? (
						<Button
							disabled={editing}
							onClick={() => editUser(currentUser.id, newUser)}
						>
							{editing ? 'Updating,...' : `Update ${currentUser.names}`}
						</Button>
					) : (
						<Button disabled={loading} onClick={() => addUser(newUser)}>
							{loading ? 'Saving the user' : 'Save'}
						</Button>
					)}
				</Card.Body>
			</Card>
		</Modal>
	);
};
