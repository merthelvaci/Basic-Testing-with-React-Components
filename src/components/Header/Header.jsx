import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ header }) => (
	<div>
		<h1 data-testid="h1tag">{header}</h1>
	</div>
);

Header.propTypes = {
	header: PropTypes.string.isRequired,
};

export default Header;
