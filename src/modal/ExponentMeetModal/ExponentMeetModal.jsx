import styles from './ExponentMeetModal.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ExponentMeetItems from "@/modal/components/ExponentMeet/ExponentMeetItems/ExponentMeetItems.jsx";
import {ScrollBox} from "@/utils/ui/index.js";
import {api} from "@/api/index.js";

const ExponentMeetModal = () => {
	const dispatch = useDispatch()

	const {item} = useSelector(state => state.multiModal.modals[0].modalData)

	const [currentDate, setCurrentDate] = useState('20.04.2025')

	const modalDate = [
		{name: 21, value: '21.04.2025'},
		{name: 22, value: '22.04.2025'},
		{name: 23, value: '23.04.2025'},
		{name: 24, value: '24.04.2025'},
		{name: 25, value: '25.04.2025'},
	]

	const getData = async () => {
		try{
			const response = await api.exponentApi.getExpoMeetingList({exponent_id: item.id, date: currentDate})

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
				<span>Встреча с {item.name}</span>
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
						<ExponentMeetItems/>
					</div>
				</div>
			</ScrollBox>
		</div>
	)
}

export default ExponentMeetModal;