import {useDispatch} from "react-redux";
import Cookies from 'js-cookie';
import styles from "./ExponentShowCatalog.module.scss";
import {useUrlParams} from "@/hooks";
import {useTranslation} from "react-i18next";

const ExponentShowCatalog = ({item}) => {

	const { removeParam } = useUrlParams();
	const dispatch = useDispatch();
	const {t} = useTranslation(); // Переводы

	// Функция для открытия модального окна при нажатии на "Смотреть каталог"
	const openExpoModal = async (e, item) => {
		e.stopPropagation()
		removeParam('catalog')

		// Получаем идентификатор пользователя из cookie
		const ExpoIDUser = Cookies.get('expo_user_id');
		// Если пользователь идентифицирован по cookie, просто выводим в консоль
		if (ExpoIDUser) {
			const newUrl = new URL(window.location);
			newUrl.searchParams.set('catalog', item.catalog.hash);
			window.history.pushState({}, '', newUrl);
		} else {
			// Если пользователь не идентифицирован, открываем модальное окно для регистрации
			dispatch({
				type: "OPEN_MODAL",
				modalType: 'expoRegisterUser',
				modalLevel: 1,
				modalData: {hash: item.catalog.hash}
			});
		}
	}

	return (
		<>
			<div className={styles.exponentBtn} onClick={(e) => {openExpoModal(e,item)}}>
				<span>{t("VIEW_CATALOG")}</span>
			</div>
		</>
	)
}

export default ExponentShowCatalog;