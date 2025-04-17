import { useState, useEffect } from 'react';

const useViewportHeight = () => {
	const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

	useEffect(() => {
		const handleResize = () => setViewportHeight(window.innerHeight);

		window.addEventListener('resize', handleResize);

		// Устанавливаем начальное значение
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return viewportHeight;
};

export default useViewportHeight;
