import {ExponentApi} from "@/api/exponentApi.js";
import {TexpoApi} from "@/api/TexpoApi.js";

export class Api {
	constructor() {
		this.exponentApi = new ExponentApi()
		this.texpoApi = new TexpoApi()
	}
}

export const api = new Api()