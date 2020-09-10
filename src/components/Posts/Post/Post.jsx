import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ body, title }) => {
	<div aria-label="post_wrapper" className="post-wrapper">
		<span aria-label="post_title" className="post-title">
			Title: {title}
		</span>
		<span aria-label="post_body" className="post-body">
			Body: {body}
		</span>
	</div>;
};

Post.propTypes = {
	body: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default Post;
