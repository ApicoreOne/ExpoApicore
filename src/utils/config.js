const currentDomain = window.location.hostname;
const domainSegments = currentDomain.split('.');
const lastSegment = domainSegments.pop();

const isLocalhost = currentDomain === 'localhost' || currentDomain.startsWith('127.') || currentDomain === '::1';

export const API_URL = `${isLocalhost || lastSegment === 'd' ? 'http' : 'https'}://api.apicore.${isLocalhost ? 'd' : lastSegment}`;

// Конфигурация для стран
export const COUNTRY_CONFIG = {
	'kz': {phone: '+7 (999)-999-99-99', bin: '999999999999', binName: 'БИН'},
	'uz': {phone: '+\\9\\98 (99)-999-99-99', bin: '999999999', binName: 'ИНН'},
	'kg': {phone: '+\\9\\96 (999)-999-999', bin: '99999999999999', binName: 'БИН'},
}

// Конфигурация TOAST
export const TOAST_CONFIG = {
	style: {
		background: '#333',
		color: '#fff',
		borderRadius: 80,
		padding: '7px 5px',
		minWidth: 250,
		maxWidth: '90vw'
	},
	success: {
		style: {
			background: 'rgb(37, 174, 136)',
		},
		icon: null
	},
	error: {
		style: {
			background: '#fe2942',
		},
		icon: null
	},
}
