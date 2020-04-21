import React, { useState, useEffect } from 'react';

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Title from "../../Title/Title";

import './Register.scss';

export default function Register() {
	const [documentType, setDocumentType] = useState('cpf');

	const [ufs, setUfs] = useState(null);
	const [cities, setCities] = useState(null);
	
	const [aboutMaxLength] = useState(320);
	const [aboutMaxLengthIndicator, setAboutMaxLengthIndicator] = useState(aboutMaxLength);

	/**
	 * Lista todos os estabelecimentos
	 */
	useEffect(() => {
		// Ufs
		fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
			.then(res => res.json())
			.then(res => {
				console.log(res);
				setUfs(res.sort((a, b) => {
					return a.nome.localeCompare(b.nome);
				}));
			});
	}, []);

	/**
	 * Ao trocar o tipo do document
	 */
	const handleDocumentTypeChange = function(event) {
		setDocumentType(event.target.value);
	}

	/**
	 * Ao trocar o tipo do document
	 */
	const handleUfChange = function(event) {
		let ufId = event.target.querySelector('option:checked').dataset.id;

		if (!ufId)
			return

		// Ufs
		fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/distritos`)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				setCities(res.sort((a, b) => {
					return a.nome.localeCompare(b.nome);
				}));
			});
	}

	/**
	 * Ao digitar no textarea
	 */
	const handleAboutMaxLength = function(event) {
		setAboutMaxLengthIndicator(aboutMaxLength - event.target.value.length);
	}

	return (
		<>
			<Header />
			<Title title="Cadastrando meu comércio" />
			<div className="register-page">
				<div className="register-page__container container">
					<form className="form">
					<div className="form__row">
						<div className="form__col form__col--2">
							<label className="form__label">Logotipo</label>
							<input className="form__input form__input--file" type="file" name="logo" />
						</div>
						
						<div className="form__col form__col--2">
							<label className="form__label">O comércio é CPF ou CNPJ?*</label>
							<div className="form__radios-wrapper">
								<label><input className="form__input form__input--radio" type="radio" name="document_type" value="cpf" onChange={handleDocumentTypeChange} checked={documentType === 'cpf'} /> CPF</label>
								<label><input className="form__input form__input--radio" type="radio" name="document_type" value="cnpj" onChange={handleDocumentTypeChange} /> CNPJ</label>
							</div>
						</div>
						
						{
							documentType === 'cpf' && 
							<div className="form__col form__col--4">
								<label className="form__label">CPF*</label>
								<input className="form__input form__input--text" type="text" name="cpf" required />
							</div>
						}

						{
							documentType === 'cnpj' && 
							<div className="form__col form__col--4">
								<label className="form__label">CNPJ*</label>
								<input className="form__input form__input--text" type="text" name="cnpj" required />
							</div>
						}

						<div className="form__col form__col--4">
							<label className="form__label">Nome do comércio*</label>
							<input className="form__input form__input--text" type="text" name="name" maxLength="100" required />
						</div>
					</div>

					<div className="form__row">
						<div className="form__col">
							<label className="form__label">Sobre o seu comércio*</label>
							<textarea className="form__input form__input--textarea" type="text" name="about" maxLength={aboutMaxLength} required onChange={handleAboutMaxLength} />
							<span className="form__maxlength-indicator">Caracteres restantes: {aboutMaxLengthIndicator}</span>
						</div>
					</div>

					<div className="form__row">
						<div className="form__col">
							<label className="form__label">CEP*</label>
							<input className="form__input form__input--text" type="text" name="postal_code" required />
						</div>

						<div className="form__col">
							<label className="form__label">Logradouro*</label>
							<input className="form__input form__input--text" type="text" name="street" required />
						</div>

						<div className="form__col">
							<label className="form__label">Nº*</label>
							<input className="form__input form__input--text" type="text" name="number" required />
						</div>

						<div className="form__col">
							<label className="form__label">Bairro*</label>
							<input className="form__input form__input--text" type="text" name="neighborhood" required />
						</div>
					</div>

					<div className="form__row">
						<div className="form__col">
							<label className="form__label">Estado*</label>
							<select className="form__input form__input--select" name="state" required onChange={handleUfChange}>
								<option></option>
								{ufs &&
									ufs.map((uf, index) => {
										return <option key={index} value={uf.sigla} data-id={uf.id}>{uf.sigla}</option>
									})
								}
							</select>
						</div>

						<div className="form__col">
							<label className="form__label">Cidade*</label>
							<select className="form__input form__input--select" name="city" required>
								<option></option>
								{cities &&
									cities.map((city, index) => {
										return <option key={index} value={city.nome} data-id={city.id}>{city.nome}</option>
									})
								}
							</select>
						</div>

						<div className="form__col">
							<label className="form__label">Telefone*</label>
							<input className="form__input form__input--text" type="tel" name="phone" required />
						</div>

						<div className="form__col">
							<label className="form__label">Whatsapp*</label>
							<input className="form__input form__input--text" type="tel" name="smartphone" required />
						</div>
					</div>
				</form>
				</div>
			</div>
			<Footer />
		</>
	)
}
