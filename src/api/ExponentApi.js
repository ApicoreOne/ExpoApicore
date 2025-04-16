import { API_CABINET_URL } from "../utils/config";
import multiFetch from "../utils/multiFetch";

export class ExponentApi{
	// API для получения списка заказов
	// Передаём {"offset":0}
	getExponentsList(body){
		return multiFetch(`${API_CABINET_URL}/site/expo.exponents.list`, body, {})
	}

}

