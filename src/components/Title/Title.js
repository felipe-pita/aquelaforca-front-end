import React from 'react';

import { ReactComponent as SectionTransaction } from '../../images/SectionTransaction.svg';

import './Title.scss';

export default function Title({title}) {
	return (
		<div className="title">
			<div className="title__container container">
				{title}
			</div>
			<SectionTransaction className="title__section-transaction" />
		</div>
	)
}