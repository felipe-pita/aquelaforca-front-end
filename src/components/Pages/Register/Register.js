import React, { useState, useEffect } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Title from "../../Title/Title";

import './Register.scss';

export default function Register() {
	const [logo, setLogo] = useState();
	const [documentType, setDocumentType] = useState('cpf');
	const [cpf, setCpf] = useState();
	const [cnpj, setCnpj] = useState();
	const [name, setName] = useState();
	const [about, setAbout] = useState();
	const [zipcode, setZipcode] = useState();
	const [street, setStreet] = useState();
	const [number, setNumber] = useState();
	const [neighborhood, setNeighborhood] = useState();
	const [city, setCity] = useState();
	const [uf, setUf] = useState();
	const [phone, setPhone] = useState();
	const [whatsapp, setWhatsapp] = useState();
	const [confirm, setConfirm] = useState();
	
	// Helpers
	const [cities, setCities] = useState();
	const [ufs, setUfs] = useState();
	const [aboutMaxLength] = useState(320);
	const [aboutMaxLengthIndicator, setAboutMaxLengthIndicator] = useState(aboutMaxLength);
	const [tags, setTags] = useState(
		[
			{id: 1, name: 'Pizza'},
			{id: 2, name: 'Lanche'},
			{id: 3, name: 'Pastel'},
			{id: 4, name: 'Arabe'},
			{id: 5, name: 'Açai'},
			{id: 6, name: 'Mercado'},
			{id: 7, name: 'Organicos'},
		]
	);

	const [selectedTags, setSelectedTags] = useState();
	

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
	 * Ao selecionar o logo
	 */
	const handleLogoChange = event => {
		var file = event.target.files[0];
		var reader = new FileReader();

		if (file)
			reader.readAsDataURL(file);

		reader.onloadend = () => {
			setLogo(reader.result);
		}
	}

	/**
	 * Ao trocar o tipo do document
	 */
	const handleDocumentTypeChange = event => {
		setDocumentType(event.target.value);
	}

	/**
	 * Ao trocar o tipo do document
	 */
	const handleUfChange = event => {
		setUf(event.target.value);

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
	const handleAboutChange = event => {
		setAbout(event.target.value);
		setAboutMaxLengthIndicator(aboutMaxLength - event.target.value.length);
	}

	/**
	 * Ao enviar o formulãrio
	 */
	const handleFormSubmit = event => {
		event.preventDefault();

		// POST request using fetch with error handling
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				logo, 
				documentType, 
				cpf, 
				cnpj, 
				name, 
				about, 
				zipcode, 
				street, 
				number, 
				neighborhood, 
				city, 
				uf, 
				phone, 
				whatsapp
			})
		};
		
		fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
		.then(async response => {
			const data = await response.json();

			// check for error response
			if (!response.ok) {
				// get error message from body or default to response status
				const error = (data && data.message) || response.status;
				return Promise.reject(error);
			}

			console.log(data);

			alert('Enviado com sucesso!');
		})
		.catch(error => {
			console.error('There was an error!', error);
		});

		return false;
	}

	return (
		<>
			<Header />
			<Title title="Cadastrando meu comércio" />
			<div className="register-page">
				<div className="register-page__container container">
					<form className="form" onSubmit={handleFormSubmit}>
						<div className="form__row">
							<div className="form__col form__col--2">
								<label className="form__label">Logotipo</label>
								<input className="form__input form__input--file" type="file" name="logo" onChange={handleLogoChange} />
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
									<input className="form__input form__input--text" type="text" name="cpf" required onChange={e => setCpf(e.target.value)} />
								</div>
							}

							{
								documentType === 'cnpj' && 
								<div className="form__col form__col--4">
									<label className="form__label">CNPJ*</label>
									<input className="form__input form__input--text" type="text" name="cnpj" required onChange={e => setCnpj(e.target.value)} />
								</div>
							}

							<div className="form__col form__col--4">
								<label className="form__label">Nome do comércio*</label>
								<input className="form__input form__input--text" type="text" name="name" maxLength="100" required onChange={e => setName(e.target.value)} />
							</div>
						</div>

						<div className="form__row">
							<div className="form__col">
								<label className="form__label">Sobre o seu comércio*</label>
								<textarea className="form__input form__input--textarea" type="text" name="about" maxLength={aboutMaxLength} required onChange={handleAboutChange} />
								<span className="form__maxlength-indicator">Caracteres restantes: {aboutMaxLengthIndicator}</span>
							</div>
						</div>

						<div className="form__row">
							<div className="form__col">
								<label className="form__label">CEP*</label>
								<input className="form__input form__input--text" type="text" name="postal_code" required onChange={e => setZipcode(e.target.value)} />
							</div>

							<div className="form__col">
								<label className="form__label">Logradouro*</label>
								<input className="form__input form__input--text" type="text" name="street" required onChange={e => setStreet(e.target.value)} />
							</div>

							<div className="form__col">
								<label className="form__label">Nº*</label>
								<input className="form__input form__input--text" type="number" name="number" required onChange={e => setNumber(e.target.value)} />
							</div>

							<div className="form__col">
								<label className="form__label">Bairro*</label>
								<input className="form__input form__input--text" type="text" name="neighborhood" required onChange={e => setNeighborhood(e.target.value)} />
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
								<select className="form__input form__input--select" name="city" required onChange={e => setCity(e.target.value)}>
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
								<input className="form__input form__input--text" type="tel" name="phone" required onChange={e => setPhone(e.target.value)} />
							</div>

							<div className="form__col">
								<label className="form__label">Whatsapp*</label>
								<input className="form__input form__input--text" type="tel" name="smartphone" required onChange={e => setWhatsapp(e.target.value)} />
							</div>
						</div>

						<div className="form__row">
							<div className="form__col">
								<label className="form__label">Tipos de produto*</label>
								<Multiselect 
									options={tags}
									selectedValues={selectedTags}
									displayValue="name"
									placeholder="Selecione"
									closeIcon='cancel'
									style={{ 
										chips: { background: '#FF7300', padding: '6px 15px' }, 
										searchBox: { border: '1px solid #383838', borderRadius: 0, height: 44, padding: '8px 14px' }, 
										optionContainer: { background: '#ffffff' },
										highlight: { background: '#FF7300' },
									}}
								/>
								<p className="form__helper">Não encontrou o produto desejado? Nos informe! <strong><a href="#teste">Clique aqui</a></strong></p>
							</div>
						</div>

						<div className="form__row">
							<div className="form__col">
								<div className="form__checkbox-wrapper">
									<label>
										<input className="form__input form__input--checkbox" type="checkbox" name="confirm" onChange={e => setNeighborhood(e.target.checked)} /> 
										Confirmo as informações e que meu estabelecimento trabalha com Delivery.
									</label>
								</div>
							</div>
						</div>

						<div className="form__row">
							<div className="form__col">
								<div className="form__buttons-wrapper">
									<button className="form__submit" type="submit">Enviar informações</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</>
	)
}
