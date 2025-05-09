import Banner from "@/components/Banner/Banner.jsx";
import Exponent from "@/components/Exponent/Exponent.jsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const ExponentPage = () => {
	const dispatch = useDispatch();

	let {expoID} = useParams();

	useEffect(() => {
		dispatch({type: "SET_CURRENT_EXPONENT_CODE", currentExponentCode: expoID})
	}, []);

	return (
		<>
			<Banner/>
			<Exponent/>
		</>
	)
}

export default ExponentPage;