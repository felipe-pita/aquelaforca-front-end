import React from 'react';
import { useHistory } from "react-router-dom";

import { ReactComponent as SectionTransaction } from '../../../images/SectionTransaction.svg';
import { ReactComponent as AboutDraw } from '../../../images/AboutDraw.svg';

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import SearchForm from '../../SearchForm/SearchForm';

import './Home.scss';

export default function Home({...props}) {
	const history = useHistory();

	const handleHomeSearch = (event) => {
		event.preventDefault();

		let searchValue = event.target.querySelector('[type=search]').value;

		history.push('/buscar', {search: searchValue});
	}
	
	return (
		<>
			<Header className="header--overlay" />
			<div className="home-page">
				<div className="home-page__search">
					<div className="home-page__search__container container">
						<SearchForm title={true} terms={true} onSearch={() => {}} onSubmit={(event) => { handleHomeSearch(event)}} />
					</div>
					<a className="home-page__search__about-link" href="#sobre">conheça</a>
				</div>
				<div className="home-page__about" id="sobre">
					<SectionTransaction className="home-page__about__section-transaction" />
					<div className="home-page__about__container container">
						<div className="home-page__about__draw">
							<AboutDraw></AboutDraw>
						</div>
						<div className="home-page__about__text">
							<h2 className="home-page__about__text__title">
								<span className="home-page__about__text__title__pre">Sobre</span>
								<span className="home-page__about__text__title__main">nós</span>
							</h2>
							<p>
								O Coronavírus infelizmente chegou. E com ele, tempos difíceis se estendem até o horizonte. Sabemos que um dos maiores prejudicados são os pequenos comerciantes locais. Será um período de muitas dificuldades, principalmente em relação à propaganda e imagem que o estabelecimento deve sustentar. Além disso, sabemos que os custos por ferramentas que teoricamente deveriam ser apoio nessas situações, na maioria das vezes, possuem custos superiores ao próprio faturamento da empresa. Considerando essa realidade, decidimos criar o AquelaForça. Um projeto construído por profissionais das áreas de T.I. e Publicidade e Propaganda, que tem um simples e claro objetivo: manter o crescimento e visibilidade dos comerciantes locais, <em>sem fins lucrativos</em>. 
							</p>
							<p>
								Bora juntos dar <strong>#aquelaforça</strong>?
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
};
