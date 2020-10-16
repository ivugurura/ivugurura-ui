import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/notFound.css';

export const NotFound = (props) => {
	return (
		<Container fluid>
			<div class='base io'>
				<h1 class='io'>404</h1>
				<h2>Page not found</h2>
				<h5>(I'm sorry buddy...)</h5>
			</div>
		</Container>
	);
};
export default NotFound;
