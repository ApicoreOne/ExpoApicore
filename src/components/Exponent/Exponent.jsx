import styles from './Exponent.module.scss'
import {useEffect} from "react";
import {api} from "@/api/index.js";
import {ExponentItem} from "@/utils/ui/index.js";

const Exponent = () => {

	const getData = async () => {
		try{
			const response = await api.exponentApi.getExponentsList({code: 'texpo4'})

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