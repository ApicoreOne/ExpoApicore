import {useDispatch} from "react-redux";
import StarFilled from '@/images/texpo/star-filled.svg?react'
import styles from './ShowFavorite.module.scss';
import {useTranslation} from "react-i18next";

const ShowFavorite = () => {

	const dispatch = useDispatch();
	const {t} = useTranslation(); // Переводы

	const openFavoriteProductList = () => {
		dispatch({type: "OPEN_MODAL", modalType: 'favoriteProductListModal', modalLevel: 1});
	}

	return (
		<div className={styles.favorite} onClick={openFavoriteProductList}>
			<span>{t("FAVORITE_TITLE")}</span>
			<StarFilled />
		</div>
	)
}

export default ShowFavorite;
