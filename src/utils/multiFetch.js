import {store} from '../store/index'

const multiFetch = async (url, body, header) => {
	//Достаем язык текущего пользователя
	let language = localStorage.getItem('language');
	//Приводим к формату без ""
	let formatLanguage = language.replace(/"/g, '');
	//Создаем кастомный body для отправки запроса
	let customBody = {...body, language : formatLanguage};

	//Сама отправка запроса
	const response = await fetch(url, {
		body: JSON.stringify(customBody),
		method: 'POST',
		headers: header,
		credentials: 'include'
	});

	const jsonData = await response.json();

	if(jsonData.authorized === false) {
		store.dispatch({ type: 'SET_USER_AUTH', authorized: false})
	}

	//Получаем данные и отдаем их
	return jsonData;
};

export default multiFetch;