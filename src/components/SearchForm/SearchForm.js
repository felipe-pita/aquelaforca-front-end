import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { ReactComponent as SearchIcon } from '../../images/Search.svg';

import './SearchForm.scss';

export default function SearchForm({ title, terms, onSearch, onSubmit, defaultValue }) {
	const history = useHistory();
	const [tags, setTags] = useState();

	/**
	 * Lista todos os estabelecimentos
	 */
	useEffect(() => {
		// Tags
		fetch("https://aquelaforca.herokuapp.com/tags", { 
			method: 'get', 
			headers: new Headers({
			  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg4MDI1NzIzLCJleHAiOjE1ODg2MzA1MjN9.MCslYa9-OL_ouUbRiKhyyR_rDEHY4iDEn9k2sRd2Jy8', 
			  'Content-Type': 'application/x-www-form-urlencoded'
			}), 
		})
		.then(res => res.json())
		.then(res => {
			let fetchTags = [];
			res.tags.map((item) => {
				fetchTags.push({id: item.id, name: item.tag});
			})
			setTags(fetchTags);
		});
	}, []);

	return (
		<div className="search-form">
			{title &&
				<h2 className="search-form__title">
					Busque pelo tipo de produto ou nome do comércio e dê <strong>#aquelaforça</strong>
				</h2>
			}

			<form className="search-form__form" onSubmit={(event) => onSubmit(event)} >
				<input type="search" className="search-form__form__input" placeholder="Busque por produtos ou nome do comércio" onChange={(event) => onSearch(event)} defaultValue={defaultValue} />
				<button type="submit" className="search-form__form__submit"><SearchIcon /></button>
			</form>

			{terms &&
				tags &&
					<ul className="search-form__terms">
						{
							tags.map((item) => {
								return <li className="search-form__terms__item" key={item.id} onClick={() => { history.push('/buscar', {tag: item.name}); }}>{item.name}</li>
							})
						}
					</ul>
			}
		</div>
	)
}