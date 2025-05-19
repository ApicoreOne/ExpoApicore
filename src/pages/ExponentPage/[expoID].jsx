import Banner from "@/components/Banner/Banner.jsx";
import Exponent from "@/components/Exponent/Exponent.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {api} from "@/api/index.js";

const ExponentPage = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	let {expoID} = useParams();

	const getData = async () => {
		setIsLoading(true)
		try{
			const response = await api.exponentApi.getExponentsList({code: expoID})
			const expoData = await api.exponentApi.getExpoData({code: expoID})

			if(response.status === true){
				dispatch({type: "SET_EXPONENT_LIST", exponentList: response.exponents})
				dispatch({type: "SET_USER_ENTITY", entity: response.entity})
			}

			if(expoData.status === true){
				dispatch({type: "SET_EXPONENT_DATA", exponentData: expoData.expo})
			}

		}catch (e) {
			console.log(e)
		}finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		// Прокрутка страницы наверх
		window.scrollTo({ top: 0, left: 0 });
		getData();
		dispatch({type: "SET_CURRENT_EXPONENT_CODE", currentExponentCode: expoID});
	}, [expoID]);



	return (
		<>
			{!isLoading && (
				<>
					<Banner/>
					<Exponent/>
				</>
			)}
		</>
	)
}

export default ExponentPage;