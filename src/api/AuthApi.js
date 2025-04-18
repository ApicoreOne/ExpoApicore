import { API_URL } from "../utils/config";
import multiFetch from "../utils/multiFetch";

export class AuthApi{
	//API авторизириует пользователя
	//Передаём body с login и password
	loginUser(body){
		return multiFetch(`${API_URL}/auth/login`, body, {});
	}

}

