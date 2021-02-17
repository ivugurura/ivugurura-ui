import React from 'react';
import { systemLanguages } from '../../utils/constants';

export const AdminPageHeader = ({ name, btnTitle, btnAction, children }) => {
	const systemLanguage = localStorage.getItem('lang') || 'kn';
	const currentLang = systemLanguages.find(
		(lang) => lang.abbr === systemLanguage
	);
	return (
		<header className='page-header'>
			<div className='container container-fluid'>
				<h4 className='no-margin-bottom'>{`${name}:====>${currentLang.lang}`}</h4>
				{/* {children} */}
				{/* <button className='btn btn-primary pull-right' onClick={btnAction}>
					{btnTitle}
				</button> */}
			</div>
		</header>
	);
};
