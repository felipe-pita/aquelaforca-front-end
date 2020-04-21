import React from 'react';
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from '../../images/Logo.svg';

import './Header.scss';

export default function Header({ className, ...props }) {

	return (
		<div className={'header ' + className} {...props}>
			<div className="header__container container">
				<Link className="header__logo" to="/">
					<Logo />
				</Link>
				
				<div className="header__buttons">
					<Link className="header__buttons__item" to="/buscar">Buscar um comércio</Link>
					<Link className="header__buttons__item header__buttons__item--border" to="/cadastrar">Quero cadastrar meu comércio</Link>
				</div>
			</div>
		</div>
	)
}