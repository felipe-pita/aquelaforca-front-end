import React, { useState, useEffect } from 'react';
import FilterResults from 'react-filter-search';

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import SearchForm from '../../SearchForm/SearchForm';
import Establishment from '../../Establishment/Establishment';

import './Search.scss';

export default function Search() {
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [establishmentsList, setEstablishmentsList] = useState(null);
	const [hasErrors, setHasErrors] = useState(false);

	/**
	 * Lista todos os estabelecimentos
	 */
	useEffect(() => {
		fetch("https://aquelaforca.herokuapp.com/establishment")
			.then(res => res.json())
			.then(res => {
				console.log(res.establishments);
				setEstablishmentsList(res.establishments);
				setIsLoading(false);
			})
			.catch(() => {
				setHasErrors(true);
				setIsLoading(false);
			});
	}, []);

	/**
	 * Controla a pesquisa
	 */
	const handleSearch = event => {
		setSearch(event.target.value);
	};

	/**
	 * Troca o título da página conforme a quatidade de itens
	 */
	const handleQuantityTitle = quantity => {
		let title = '';

		if (quantity === null) 
			title = ''
		if (quantity > 1) 
			title = `${quantity} Resultados encontrados:`;
		if (quantity === 1) 
			title =  `1 Resultado encontrado:`;
		if (quantity === 0) 
			title =  `Nenhum resultado encontrado:`;

		window.document.title += ' - ' + title;
		return title;
	}

	return (
		<>
			<Header />
			<div className="search-page">
				<div className="search-page__form">
					<div className="search-page__form__container container">
						<SearchForm title={true} onSearch={handleSearch} />
					</div>
				</div>
				<div className="search-page__results">
					<div className="search-page__results__container container">

						{ isLoading &&
							'carregando...'
						}

						{establishmentsList &&
							<FilterResults
								value={search}
								data={establishmentsList}
								renderResults={filteredEstablishments => (
									<>
										<h1 className="search-page__results__title">{handleQuantityTitle(filteredEstablishments.length)}</h1>

										<ul className="search-page__results__list">
											{filteredEstablishments.map((establishment, index) => (
												<Establishment key={index} establishment={establishment} />
											))}
										</ul>
									</>
								)}
							/>
						}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};