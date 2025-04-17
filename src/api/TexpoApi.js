import { API_URL } from "@/utils/config";
import multiFetch from "@/utils/multiFetch";

export class TexpoApi {

	getCatalogCategoryList(body){
		return multiFetch(`${API_URL}/site/texpo3.catalog.category.list`, body)
	}

	getCatalogProductList(body){
		return multiFetch(`${API_URL}/site/texpo3.catalog.product.list`, body)
	}

	getCatalogProductDetail(body){
		return multiFetch(`${API_URL}/site/texpo3.catalog.product.detail`, body)
	}

	saveContact(body){
		return multiFetch(`${API_URL}/site/texpo3.contact.save`, body)
	}

	getCompanyList(body){
		return multiFetch(`${API_URL}/site/texpo3.company.list`, body)
	}

	getFavoriteList(body){
		return multiFetch(`${API_URL}/site/texpo3.favorites.product.list`, body)
	}

}

