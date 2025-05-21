import { useMemo } from 'react';

export default function useNormalizedUrl(rawUrl) {
	return useMemo(() => {
		if (!rawUrl || typeof rawUrl !== 'string') return { href: null, text: '' };

		let url = rawUrl.trim();

		// Удаляем слеш в конце, если он есть (и это не https://)
		if (url.endsWith('/') && url.length > 1) {
			url = url.slice(0, -1);
		}

		let href = url;
		let text = url;

		// Добавляем https:// если не указано
		if (!/^https?:\/\//i.test(url)) {
			if (url.startsWith('www.')) {
				href = `https://${url}`;
			} else {
				href = `https://www.${url}`;
			}
		} else {
			href = url;
		}

		// Удаляем протокол и www для отображения
		text = href
			.replace(/^https?:\/\//i, '')
			.replace(/^www\./i, '')
			.replace(/\/$/, ''); // ещё раз убираем / в конце на всякий случай

		return { href, text };
	}, [rawUrl]);
}
