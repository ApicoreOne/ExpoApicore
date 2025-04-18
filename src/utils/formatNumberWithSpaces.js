export default function formatNumberWithSpaces(number) {
	return number.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
}