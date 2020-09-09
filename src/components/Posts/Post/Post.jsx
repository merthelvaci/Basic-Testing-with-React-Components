import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ body, title }) => {
	<div data-testid="post_wrapper" className="post-wrapper">
		<span data-testid="post_title" className="post-title">
			Title: {title}
		</span>
		<span data-testid="post_body" className="post-body">
			Body: {body}
		</span>
	</div>;
};

Post.propTypes = {
	body: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default Post;
