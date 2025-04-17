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

}

