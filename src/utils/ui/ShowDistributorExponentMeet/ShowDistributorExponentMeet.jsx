import styles from './ShowDistributorExponentMeet.module.scss'
import CalendarIcon from '@/images/calendar.svg?react'
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";

const ShowDistributorExponentMeet = () => {
	const dispatch = useDispatch();
	const authorized = useSelector(state => state.userData.authorization);

	const openModal = () => {
		const ExpoIDUser = Cookies.get('expo_user_id');
		// Если пользователь идентифицирован по cookie, просто выводим в консоль
		if (ExpoIDUser || authorized === true) {
			dispatch({type: "OPEN_MODAL", modalType: 'distributorExponentMeetModal', modalLevel: 1})
		} else {
			// Если пользователь не идентифицирован, открываем модальное окно для регистрации
			dispatch({
				type: "OPEN_MODAL",
				modalType: 'expoRegisterUser',
				modalLevel: 1,
				modalData: {hash: null}
			});
		}
	}

	return(
		<div className={styles.showDistributorExponentMeet} onClick={openModal}>
			<span>Встречи</span>
			<CalendarIcon />
		</div>
	)
}

export default ShowDistributorExponentMeet;