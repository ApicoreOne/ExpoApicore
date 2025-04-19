import styles from './DistributorExponentMeetModal.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {ScrollBox} from "@/utils/ui/index.js";
import DistributorExponentMeetItems from "@/modal/components/ExponentMeet/DistributorExponentMeetItems/DistributorExponentMeetItems.jsx";
import {api} from "@/api/index.js";
import Cookies from "js-cookie";

const DistributorExponentMeetModal = () => {
	const dispatch = useDispatch()

	const [currentDate, setCurrentDate] = useState('20.04.2025')
	const ExpoIDUser = Cookies.get('expo_user_id');
	const authorized = useSelector(state => state.userData.authorization);
	const authEntity = useSelector(state => state.userData.entity);

	const modalDate = [
		{name: 20, value: '20.04.2025'},
		{name: 21, value: '21.04.2025'},
		{name: 22, value: '22.04.2025'},
		{name: 23, value: '23.04.2025'},
		{name: 24, value: '24.04.2025'},
		{name: 25, value: '25.04.2025'},
	]

	const getData = async () => {
		try{
			let response = null;

			if(authorized){
				response = await api.exponentApi.getExpoMeetingDistributorList({date: currentDate, exponent_id: authEntity.id})
			}else{
				response = await api.exponentApi.getExpoMeetingClientList({client_id: ExpoIDUser , date: currentDate})
			}

			if(response.status === true) {
				dispatch({type: "SET_EXPONENT_MEETING_SLOT", exponentMeetingSlotList: response.slots})
			}
		}catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		dispatch({type: "SET_EXPONENT_MEETING_DATE_LIST", exponentMeetingDateList: modalDate})
		dispatch({type: "SET_CURRENT_EXPONENT_MEETING_DATE", currentExponentMeetingDate: modalDate[0].value})

		getData()
	}, []);



	useEffect(() => {
		dispatch({type: "SET_CURRENT_EXPONENT_MEETING_DATE", currentExponentMeetingDate: currentDate})

		getData()
	},[currentDate])

	return (
		<div className={styles.modal}>
			<div className={styles.modalTitle}>
				<span>Встреча с </span>
			</div>

			<ScrollBox>
				<div className={styles.modalContent}>
					<div className={styles.modalContentDate}>
						<span>2025 г. Апрель</span>
					</div>

					<div className={styles.modalContentDateItems}>
						{
							modalDate.map((item, index) => {
								return (
									<div className={`${styles.modalContentDateItem} ${currentDate === item.value ? styles.active : ""}`} onClick={()=>{setCurrentDate(item.value)}}>
										<span>{item.name}</span>
									</div>
								)
							})
						}
					</div>

					<div className={styles.modalContentExponentMeet}>
						<DistributorExponentMeetItems/>
					</div>
				</div>
			</ScrollBox>
		</div>
	)
}

export default DistributorExponentMeetModal;