import React from 'react';
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from '../../images/Logo.svg';

import './Header.scss';

const Header = () => (
	<div className="header">
		<div className="header__container container">
			<Logo className="header__logo"></Logo>
			
			<div className="header__buttons">
				<Link className="header__buttons__item" to="/buscar">Buscar um comércio</Link>
				<Link className="header__buttons__item header__buttons__item--border" to="/cadastrar">Quero cadastrar meu comércio</Link>
			</div>
		</div>
	</div>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
