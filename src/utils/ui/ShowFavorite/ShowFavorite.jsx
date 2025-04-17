import {useDispatch} from "react-redux";
import StarFilled from '@/images/texpo/star-filled.svg?react'
import styles from './ShowFavorite.module.scss';

const ShowFavorite = () => {

	const dispatch = useDispatch();

	const openFavoriteProductList = () => {
		dispatch({type: "OPEN_MODAL", modalType: 'favoriteProductListModal', modalLevel: 1});
	}

	return (
		<div className={styles.favorite} onClick={openFavoriteProductList}>
			<span>Избранные</span>
			<StarFilled />
		</div>
	)
}

export default ShowFavorite;
