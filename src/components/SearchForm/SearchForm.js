import React from 'react';

import { ReactComponent as SearchIcon } from '../../images/Search.svg';

import './SearchForm.scss';

export default function SearchForm({ title, terms, onSearch }) {
	return (
		<div className="search-form">
			{title &&
				<h2 className="search-form__title">
					Busque pelo tipo de produto ou nome do comércio e dê <strong>#aquelaforça</strong>
				</h2>
			}

			<form className="search-form__form" onSubmit={(event) => event.preventDefault()}>
				<input type="search" className="search-form__form__input" placeholder="Busque por produtos ou nome do comércio" onChange={(event) => onSearch(event)} />
				<button type="submit" className="search-form__form__submit"><SearchIcon /></button>
			</form>

			{terms &&
				<ul className="search-form__terms">
					<li className="search-form__terms__item">Lanches</li>
					<li className="search-form__terms__item">Lanches</li>
					<li className="search-form__terms__item">Lanches</li>
				</ul>
			}
		</div>
	)
}