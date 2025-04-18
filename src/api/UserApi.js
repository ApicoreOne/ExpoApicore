import { API_URL } from "@/utils/config";
import multiFetch from "@/utils/multiFetch";

export class UserApi {
	getUserIsAuth(body){
		return multiFetch(`${API_URL}/auth/isauthorized`, body)
	}

}

