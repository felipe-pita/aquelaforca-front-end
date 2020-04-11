import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

const Footer = () => (
	<div className="footer">
		<div className="footer__container container">
			<strong>Dúvidas?</strong> <a href="mailto:fale@aquelaforça.com.br">fale@aquelaforça.com.br</a>
		</div>
	</div>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
