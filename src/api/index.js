import {ExponentApi} from "@/api/exponentApi.js";
import {UserApi} from "@/api/UserApi.js";
import {AuthApi} from "@/api/AuthApi.js";

export class Api {
	constructor() {
		this.exponentApi = new ExponentApi()
		this.userApi = new UserApi()
		this.authApi = new AuthApi()
	}
}

export const api = new Api()