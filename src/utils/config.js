const currentDomain = window.location.hostname;
const domainSegments = currentDomain.split('.');
const lastSegment = domainSegments.pop();

const isLocalhost = currentDomain === 'localhost' || currentDomain.startsWith('127.') || currentDomain === '::1';

export const API_CABINET_URL = `${isLocalhost || lastSegment === 'd' ? 'http' : 'https'}://api.apicore.${isLocalhost ? 'd' : lastSegment}`;
