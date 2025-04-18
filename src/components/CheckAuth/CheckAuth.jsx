import { useEffect } from "react";
import {useDispatch} from "react-redux";
import {api} from "@/api/index.js";

const CheckAuth = ({ children }) => {
	const dispatch = useDispatch();

	const getData = async () => {
		try{
			const response = await api.userApi.getUserIsAuth({}); // Запрашиваем данные аккаунта

			if(response.authorized === true ) {
				dispatch({type: "SET_USER_DATA", authorization: true})
			}else{
				dispatch({type: "SET_USER_DATA", authorization: false})
			}
		}catch (e) {
			console.log(e)
			dispatch({type: "SET_USER_DATA", authorization: false})
		}
	}

	useEffect(() => {
		getData()
	}, []);

	return <>{children}</>;
};

export default CheckAuth;
