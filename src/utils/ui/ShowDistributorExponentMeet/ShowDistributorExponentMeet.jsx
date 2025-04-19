import styles from './ShowDistributorExponentMeet.module.scss'
import CalendarIcon from '@/images/calendar.svg?react'
import {useDispatch} from "react-redux";

const ShowDistributorExponentMeet = () => {
	const dispatch = useDispatch();

	const openModal = () => {
		dispatch({type: "OPEN_MODAL", modalType: 'distributorExponentMeetModal', modalLevel: 1})
		console.log('openModal')
	}

	return(
		<div className={styles.showDistributorExponentMeet} onClick={openModal}>
			<span>Встречи</span>
			<CalendarIcon />
		</div>
	)
}

export default ShowDistributorExponentMeet;