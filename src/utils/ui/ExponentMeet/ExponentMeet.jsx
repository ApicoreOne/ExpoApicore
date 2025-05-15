import styles from './ExponentMeet.module.scss'
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import {useTranslation} from "react-i18next";

const ExponentMeet = ({item}) => {
	const dispatch = useDispatch()
	const authorized = useSelector(state => state.userData.authorization);
	const {t} = useTranslation(); // Переводы

	const openModal = (e) => {
		e.stopPropagation()

		const ExpoIDUser = Cookies.get('expo_user_id');

		// Если пользователь идентифицирован по cookie, просто выводим в консоль
		if (ExpoIDUser && authorized !== true) {
			dispatch({type: "OPEN_MODAL", modalType: 'exponentMeetModal', modalLevel: 1, modalData:{item:item}})
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
		<div className={styles.exponentMeet} onClick={openModal}>
			<span>{t("SET_MEETING")}</span>
		</div>
	)
}

export default ExponentMeet;