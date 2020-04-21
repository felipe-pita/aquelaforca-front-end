import React from 'react';
import './Establishment.scss';

export default function Establishment({establishment, ...props}) { 
	return (
		<li className="establishment">
			<img className="establishment__logo" src="http://placehold.it/120x120" alt="alt" />
			<div className="establishment__info">
				<h2 className="establishment__title">{ establishment.name }</h2>
				<address className="establishment__address">
					{ establishment.contact.street && establishment.contact.street }
					{ establishment.contact.number && ', ' + establishment.contact.number }
					{ ' - BAIRRO' }
					{ establishment.contact.city && ', ' + establishment.contact.city }
					{ establishment.contact.state && ', ' + establishment.contact.state }
					{ establishment.contact.complement && ' - ' + establishment.contact.complement }
				</address>
				<ul className="establishment__contact">
					<li className="establishment__contact__item">
						<span className="establishment__contact__icon">zap</span>
						{ establishment.contact.smartphone }
					</li>
					<li className="establishment__contact__item">
						<span className="establishment__contact__icon">tel</span>
						{ establishment.contact.phone }
					</li>
				</ul>
				<p className="establishment__description">
					{ establishment.description }
				</p>
			</div>
		</li>
	);
}
