import styles from "@/modal/ExponentMeetModal/ExponentMeetModal.module.scss";
import {ScrollBox} from "@/utils/ui/index.js";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {api} from "@/api/index.js";

const ExponentDetailModal = () => {

	const {item} = useSelector(state => state.multiModal.modals[0].modalData)

	const getData = async() => {
		try{
			const response = await api.exponentApi.getExpoExponentsDetail({exponent_id: item.id})

			console.log(response)


		}catch (e){
			console.log(e)
		}
	}

	useEffect(() => {
		getData()
	}, []);

	return(
		<>
			<div className={styles.modal}>
				<div className={styles.modalTitle}>
					<span>{item?.name}</span>
				</div>

				<ScrollBox>

				</ScrollBox>
			</div>
		</>
	)
}

export default ExponentDetailModal