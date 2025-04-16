import {store} from '../store/index'

const multiFetch = async (url, body, header) => {

	//Создаем кастомный body для отправки запроса
	let customBody = {...body};

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