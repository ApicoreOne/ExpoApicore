import styles from './ExponentMeet.module.scss'
import {useDispatch} from "react-redux";

const ExponentMeet = ({item}) => {

	const dispatch = useDispatch()

	const openModal = () => {
		dispatch({type: "OPEN_MODAL", modalType: 'exponentMeetModal', modalLevel: 1, modalData:{item:item}})
	}

	return(
		<div className={styles.exponentMeet} onClick={openModal}>
			<span>Назначить встречу</span>
		</div>
	)
}

export default ExponentMeet;