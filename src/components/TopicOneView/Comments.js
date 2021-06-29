import React, { useEffect } from 'react';
import 'styles/topicsComments.css';
import { useSelector } from 'react-redux';
import { formatDate } from 'utils/constants';
import { getTopicsComments } from 'redux/actions';
import { Loading } from 'components/common';

export const Comments = ({ slug }) => {
	const { topicComments, comment } = useSelector(
		({ topicComments, comment }) => ({
			topicComments,
			comment
		})
	);
	const { commentsFetching, comments } = topicComments;
	const { commentAdded } = comment;
	useEffect(() => {
		getTopicsComments(slug);
	}, [slug, commentAdded]);
	return (
		<div>
			{commentsFetching ? (
				<Loading />
			) : comments.length ? (
				<>
					<h4>Commentaries</h4>
					<ul class='timeline'>
						{comments.map((comment, commentIndex) => (
							<li key={commentIndex}>
								<strong>{comment.names}</strong>
								<i class='float-right'>{formatDate(comment.createdAt)}</i>
								<p>{comment.content}</p>
							</li>
						))}
					</ul>
				</>
			) : null}
		</div>
	);
};
