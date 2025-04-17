import { useLocation, useNavigate } from 'react-router-dom';

const useUrlParams = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const addParam = (key, value) => {
		const searchParams = new URLSearchParams(location.search);
		searchParams.set(key, value); // Добавляет или обновляет параметр
		navigate(`${location.pathname}?${searchParams.toString()}`);
	};

	const removeParam = (key) => {
		const searchParams = new URLSearchParams(location.search);
		searchParams.delete(key); // Удаляет параметр
		navigate(`${location.pathname}?${searchParams.toString()}`);
	};

	const getParam = (key) => {
		const searchParams = new URLSearchParams(location.search);
		return searchParams.get(key); // Возвращает значение параметра
	};

	return { addParam, removeParam, getParam };
};

export default useUrlParams;
