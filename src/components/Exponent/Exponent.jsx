import styles from './Exponent.module.scss'
import {useEffect} from "react";
import {api} from "@/api/index.js";
import {ExponentItem} from "@/utils/ui/index.js";
import {useDispatch, useSelector} from "react-redux";

const Exponent = () => {
	const dispatch = useDispatch();
	const exponentList = useSelector(state => state.exponent.exponentList)

	const getData = async () => {
		try{
			const response = await api.exponentApi.getExponentsList({code: 'texpo4'})

			if(response.status === true){
				dispatch({type: "SET_EXPONENT_LIST", exponentList: response.exponents})
			}

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

			<div className={styles.exponentItems}>
				{
					exponentList.length > 0 && exponentList.map((item, index) => {
						return (
							<ExponentItem key={index} item={item} />
						)
					})
				}
			</div>
		</div>
	)
}

export default Exponent;