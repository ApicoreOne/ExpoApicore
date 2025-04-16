import {ExponentApi} from "@/api/exponentApi.js";

export class Api {
	constructor() {
		this.exponentApi = new ExponentApi()
	}
}

export const api = new Api()