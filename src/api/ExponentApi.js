import { API_URL } from "../utils/config";
import multiFetch from "../utils/multiFetch";

export class ExponentApi{
	// API для получения списка заказов
	// Передаём {"offset":0}
	getExponentsList(body){
		return multiFetch(`${API_URL}/site/expo.exponents.list`, body, {})
	}

	saveContact(body){
		return multiFetch(`${API_URL}/site/expo.contact.save`, body)
	}

	getCatalogCategoryList(body){
		return multiFetch(`${API_URL}/site/expo.catalog.category.list`, body)
	}

	getCatalogProductList(body){
		return multiFetch(`${API_URL}/site/expo.catalog.product.list`, body)
	}

	getFavoriteList(body){
		return multiFetch(`${API_URL}/site/expo.favorites.product.list`, body)
	}

	getCatalogProductDetail(body){
		return multiFetch(`${API_URL}/site/expo.catalog.product.detail`, body)
	}

	getCompanyList(body){
		return multiFetch(`${API_URL}/site/expo.company.list`, body)
	}

	addExpoMeeting(body){
		return multiFetch(`${API_URL}/site/expo.meeting.add`, body)
	}

	getExpoMeetingList(body){
		return multiFetch(`${API_URL}/site/expo.meeting.list`, body)
	}

	getExpoMeetingClientList(body){
		return multiFetch(`${API_URL}/site/expo.meeting.client.list`, body)
	}

	getExpoMeetingDistributorList(body){
		return multiFetch(`${API_URL}/site/expo.meeting.distributor.list`, body)
	}

	getExpoList(){
		return multiFetch(`${API_URL}/site/expo.list`, {})
	}

}

