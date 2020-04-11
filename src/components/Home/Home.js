import React from 'react';

import { ReactComponent as SearchIcon } from '../../images/Search.svg';
import { ReactComponent as SectionTransaction } from '../../images/SectionTransaction.svg';
import { ReactComponent as AboutDraw } from '../../images/AboutDraw.svg';

import './Home.scss';

const Home = ({...props}) => (
	<div className="home">
		<div className="home__search">
			<div className="home__search__container container">
				<h2 className="home__search__title">
					Busque pelo tipo de produto ou nome do comércio e dê <strong>#aquelaforça</strong>
				</h2>
				<form className="home__search__form">
					<input type="search" className="home__search__form__input" placeholder="Busque por produtos ou nome do comércio" />
					<button type="submit" className="home__search__form__submit">
						<SearchIcon />
					</button>
				</form>
				<ul className="home__search__terms">
					<li className="home__search__terms__item">Lanches</li>
					<li className="home__search__terms__item">Lanches</li>
					<li className="home__search__terms__item">Lanches</li>
				</ul>
			</div>
			<a className="home__search__about-link" href="#sobre">conheça</a>
		</div>
		<div className="home__about" id="sobre">
			<SectionTransaction className="home__about__section-transaction" />
			<div className="home__about__container container">
				<div className="home__about__draw">
					<AboutDraw></AboutDraw>
				</div>
				<div className="home__about__text">
					<h2 className="home__about__text__title">
						<span className="home__about__text__title__pre">Sobre</span>
						<span className="home__about__text__title__main">nós</span>
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
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
