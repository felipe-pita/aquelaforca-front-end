import React, { useState, useEffect } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import InputMask from "react-input-mask";

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
	const [confirmDelivery, setConfirmDelivery] = useState();
	
	// Helpers
	const [cities, setCities] = useState();
	const [ufs, setUfs] = useState();
	const [aboutMaxLength] = useState(320);
	const [aboutMaxLengthIndicator, setAboutMaxLengthIndicator] = useState(aboutMaxLength);
	const [tags, setTags] = useState();
	const [selectedTags, setSelectedTags] = useState();

	// Erros
	const [hasError, setHasError] = useState();
	
	// Enviando
	const [sending, setSending] = useState();
	const [sent, setSent] = useState();

	/**
	 * Lista todos os estabelecimentos
	 */
	useEffect(() => {
		// Ufs
		fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
		.then(res => res.json())
		.then(res => {
			setUfs(res.sort((a, b) => {
				return a.nome.localeCompare(b.nome);
			}));
		});

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

	/**
	 * Ao selecionar o logo
	 */
	const handleLogoChange = event => {
		var file = event.target.files[0];

		if (file.size > 5242880) {
			alert('Imagem muito grande. Favor enviar uma imagem menor que 5mb.');
			event.target.value = null;
			return;
		}

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
	const handleUfChange = event => {
		setUf(event.target.value);

		let ufId = event.target.querySelector('option:checked').dataset.id;

		if (!ufId)
			return

		// Ufs
		fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/distritos`)
		.then(res => res.json())
		.then(res => {
			//console.log(res);
			setCities(res.sort((a, b) => {
				return a.nome.localeCompare(b.nome);
			}));
		});
	}

	const formatTagsBeforeSend = (tags) => {
		let formatedTags = [];
		tags.map((item) => {
			formatedTags.push(item.name);
		});

		return formatedTags;
	}

	/**
	 * Ao enviar o formulãrio
	 */
	const handleFormSubmit = event => {
		event.preventDefault();

		let requiredInputs = [documentType, name, about, zipcode, street, number, neighborhood, city, phone, whatsapp];

		if (requiredInputs.includes(null)) {
			setHasError('Preencha todos os campos obrigatórios (marcados com *).');
			return;
		}

		if (!confirmDelivery) {
			setHasError('Devido ao momento atual só podemos aceitar estabelecimentos que trabalhem com delivery.');
			return;
		}

		if (sending) {
			setHasError('Estamos enviando sua solicitação. Aguarde e tente novamente.');
			return;
		}

		

		// POST request using fetch with error handling
		const requestOptions = {
			method: 'POST',
			headers: new Headers({
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg4MDI1NzIzLCJleHAiOjE1ODg2MzA1MjN9.MCslYa9-OL_ouUbRiKhyyR_rDEHY4iDEn9k2sRd2Jy8', 
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				'mode': 'no-cors',
			}),
			body: JSON.stringify({
				"picture": logo, 
				"name": name, 
				"description": about, 
				"documentType": documentType, 
				"cpf": cpf, 
				"cpnj": cnpj, 
				"zipcode": zipcode, 
				"street": street, 
				"number": number, 
				"neighborhood": neighborhood, 
				"city": city, 
				"state": uf, 
				"phone": phone, 
				"smartphone": whatsapp,
				"products": formatTagsBeforeSend(tags),
			})
		};

		setSending(true);

		fetch('https://aquelaforca.herokuapp.com/establishment', requestOptions)
		.then(async response => {
			const data = await response.json();

			// check for error response
			if (!response.ok) {
				// get error message from body or default to response status
				const error = (data && data.message) || response.status;
				setSending(false);
				return Promise.reject(error);
			}

			console.log(data);

			setSending(false);
			setSent(true);
		})
		.catch(error => {
			console.error('There was an error!', error);
			setSending(false);
		});

		return false;
	}

	return (
		<>
			<Header />
			<Title title="Cadastrando meu comércio" />
			<div className="register-page">
				<div className="register-page__container container">
					{!sent &&
						<form className="form" onSubmit={handleFormSubmit}>
							<div className="form__row">
								<div className="form__col form__col--5">
									<label className="form__label">O comércio é CPF ou CNPJ?*</label>
									<div className="form__radios-wrapper">
										<label><input className="form__input form__input--radio" type="radio" name="document_type" value="cpf" onChange={e => setDocumentType(e.target.value)} checked={documentType === 'cpf'} /> CPF</label>
										<label><input className="form__input form__input--radio" type="radio" name="document_type" value="cnpj" onChange={e => setDocumentType(e.target.value)} /> CNPJ</label>
									</div>
								</div>
							</div>
							<div className="form__row">
								{
									documentType === 'cpf' && 
									<div className="form__col form__col--3">
										<label className="form__label">CPF*</label>
										<InputMask className="form__input form__input--text" type="text" name="cpf" required  mask="999.999.999-99" onChange={e => setCpf(e.target.value)} />
									</div>
								}

								{
									documentType === 'cnpj' && 
									<div className="form__col form__col--3">
										<label className="form__label">CNPJ*</label>
										<InputMask className="form__input form__input--text" type="text" name="cnpj" required mask="99.999.999/9999-99" onChange={e => setCnpj(e.target.value)} />
									</div>
								}
							</div>

							<div className="form__row">
								<div className="form__col form__col--6 form__col--logo">
									<label className="form__label">Logotipo</label>
									<input className="form__input form__input--file" type="file" name="logo" onChange={handleLogoChange} accept=".jpg,.jpeg,.png,.svg" />
								</div>
								
								<div className="form__col form__col--6">
									<label className="form__label">Nome do comércio*</label>
									<input className="form__input form__input--text" type="text" name="name" maxLength="100" required onChange={e => setName(e.target.value)} />
								</div>
							</div>

							<div className="form__row">
								<div className="form__col">
									<label className="form__label">Sobre o seu comércio*</label>
									<textarea className="form__input form__input--textarea" type="text" name="about" maxLength={aboutMaxLength} required onKeyUp={e => setAboutMaxLengthIndicator(aboutMaxLength - e.target.value.length)} onChange={e => setAbout(e.target.value)} />
									<span className="form__maxlength-indicator">Caracteres restantes: {aboutMaxLengthIndicator}</span>
								</div>
							</div>

							<div className="form__row">
								<div className="form__col">
									<label className="form__label">CEP*</label>
									<InputMask className="form__input form__input--text" type="text" name="postal_code" required mask="99999-999" onChange={e => setZipcode(e.target.value)} />
								</div>

								<div className="form__col">
									<label className="form__label">Logradouro*</label>
									<input className="form__input form__input--text" type="text" name="street" required onChange={e => setStreet(e.target.value)} placeholder="Nome da rua" />
								</div>

								<div className="form__col">
									<label className="form__label">Nº*</label>
									<InputMask className="form__input form__input--text" type="text" name="number" required mask="99999" onChange={e => setNumber(e.target.value)} />
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
									<InputMask className="form__input form__input--text" type="tel" name="phone" required mask="(99) 9999-9999" onChange={e => setPhone(e.target.value)} />
								</div>

								<div className="form__col">
									<label className="form__label">Whatsapp*</label>
									<InputMask className="form__input form__input--text" type="tel" name="smartphone" required mask="(99) 99999-9999" onChange={e => setWhatsapp(e.target.value)} />
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
								</div>
							</div>

							<div className="form__row">
								<div className="form__col">
									<p className="form__helper">Não encontrou o produto desejado? Nos informe! <strong><a href="#teste">Clique aqui</a></strong></p>
								</div>
							</div>

							<div className="form__row">
								<div className="form__col">
									<div className="form__checkbox-wrapper">
										<label>
											<input className="form__input form__input--checkbox" type="checkbox" name="confirm" onChange={e => setConfirmDelivery(e.target.checked)} /> 
											Confirmo as informações e que meu estabelecimento trabalha com Delivery.
										</label>
									</div>
								</div>
							</div>

							{hasError &&
								<div className="form__row">
									<div className="form__col">
										<div className="form__error">
											{hasError}
										</div>
									</div>
								</div>
							}

							<div className="form__row">
								<div className="form__col">
									<div className="form__buttons-wrapper">
										{sending &&
											<button className="form__submit" type="submit" disabled>Enviando...</button>
										}
										{!sending &&
											<button className="form__submit" type="submit">Enviar informações</button>
										}
									</div>
								</div>
							</div>
						</form>

					}

					{sent &&
						<p>
							Prontinho! <strong>Seu cadastro já foi criado.</strong><br />
							Estamos validando suas informações e se estiver tudo certo, entre 2 à 6 horas seu estabelecimento estará disponível em nossa busca.<br />
							Qualquer dúvida é só nos chamar ;D. <strong>#tamojunto #aquelaforça #comerciolocal #contraocovid19</strong>
						</p>
					}
				</div>
			</div>
			<Footer />
		</>
	)
}
