export default function getLastDomainSegment() {
	const currentDomain = window.location.hostname;

	// Проверка на localhost
	if (
		currentDomain === 'localhost' ||
		currentDomain === '127.0.0.1' ||
		currentDomain.endsWith('.localhost')
	) {
		return 'd';
	}

	const domainSegments = currentDomain.split('.');
	return domainSegments.pop();
}
