import React from 'react';
import Pagination from 'react-bootstrap-4-pagination';
import _ from 'lodash';
import { Card, Table } from 'react-bootstrap';
import { Loading } from './Loading';

export const CustomTable = ({
	title = '',
	data = [],
	columns = [],
	currentPage = 1,
	pageCount = 1,
	dataCount = 0,
	itemPerPage = 5,
	loading = false,
	isBordered = true,
	size = 'sm',
	onChangePage
}) => {
	const renderCell = (item, column) => {
		if (column.content) return column.content(item);
		return _.get(item, column.path);
	};
	return (
		<Card>
			<Card.Header>
				<Card.Title>{title}</Card.Title>
				{dataCount !== 0 && (
					<Card.Subtitle className='pull-right'>
						{dataCount} records found, page {currentPage} of {pageCount}
					</Card.Subtitle>
				)}
			</Card.Header>
			<Card.Body>
				{dataCount > 0 ? (
					<Table striped hover responsive bordered={isBordered} size={size}>
						<thead>
							<tr>
								<th>
									N<sup>O</sup>
								</th>
								{columns.map(({ label }, columnIdx) => (
									<th key={columnIdx}>{label}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((item, itemIdx) => (
								<tr key={itemIdx}>
									<td>{(currentPage - 1) * itemPerPage + itemIdx + 1}</td>
									{columns.map((cellColumn, cellColumnIdx) => (
										<td key={cellColumnIdx}>{renderCell(item, cellColumn)}</td>
									))}
								</tr>
							))}
						</tbody>
					</Table>
				) : loading ? (
					<Loading />
				) : (
					<h4>No data to display yet</h4>
				)}
			</Card.Body>
			<Card.Footer>
				{dataCount > 0 && (
					<Pagination
						totalPages={pageCount}
						currentPage={currentPage}
						prevNex
						threeDots
						circle
						size='sm'
						onClick={onChangePage}
					/>
				)}
			</Card.Footer>
		</Card>
	);
};
