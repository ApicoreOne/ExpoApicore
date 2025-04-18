import styles from './ExponentMeetModal.module.scss'
import {useSelector} from "react-redux";
import {useState} from "react";
import ExponentMeetItems from "@/modal/components/ExponentMeet/ExponentMeetItems/ExponentMeetItems.jsx";
import {ScrollBox} from "@/utils/ui/index.js";

const ExponentMeetModal = () => {

	const {item} = useSelector(state => state.multiModal.modals[0].modalData)

	const [currentDate, setCurrentDate] = useState(19)

	const modalDate = [
		{name: 19, value: 19},
		{name: 20, value: 20},
		{name: 21, value: 21},
		{name: 22, value: 22},
		{name: 23, value: 23},
		{name: 24, value: 24},
	]

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