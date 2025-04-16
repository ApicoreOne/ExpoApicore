import styles from './Exponent.module.scss'
import {useEffect} from "react";
import {api} from "@/api/index.js";
import {ExponentItem} from "@/utils/ui/index.js";
import {useDispatch} from "react-redux";

const Exponent = () => {
	const dispatch = useDispatch();

	const getData = async () => {
		try{
			const response = await api.exponentApi.getExponentsList({code: 'texpo4'})
			dispatch({type: "SET_EXPONENT_LIST", exponentList: response.exponents})

			console.log(response)
		}catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		getData()
	}, []);


	return(
		<div className={styles.exponent}>
			<div className={styles.exponentTitle}>
				<span>Экспоненты</span>
			</div>

			<ExponentItem />

		</div>
	)
}

export default Exponent;