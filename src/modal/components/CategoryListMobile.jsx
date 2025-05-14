import Img from '../../images/catalogs/category-menu-mobile.svg?react'
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

const CategoryListMobile = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation()

	const openCategoryModal = () => {
		// Диспатчим действие для открытия модального окна
		dispatch({type: "OPEN_MODAL", modalLevel : 2, modalType: 'categoryListMobileModal', modalIsOpen: true, modalWidth: 'large'})
	}

	return(
		<div className={'i_category-list-mobile'} onClick={openCategoryModal}>
			<Img />
			<span>{t("CATEGORIES_TITLE")}</span>
		</div>
	)
}

export default CategoryListMobile;