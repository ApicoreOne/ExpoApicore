import Img from '../../images/catalogs/category-menu-mobile.svg?react'
import {useDispatch} from "react-redux";

const CategoryListMobile = () => {
	const dispatch = useDispatch();

	const openCategoryModal = () => {
		// Диспатчим действие для открытия модального окна
		dispatch({type: "OPEN_MODAL", modalLevel : 2, modalType: 'categoryListMobileModal', modalIsOpen: true, modalWidth: 'large'})
	}

	return(
		<div className={'i_category-list-mobile'} onClick={openCategoryModal}>
			<Img />
			<span>Категории</span>
		</div>
	)
}

export default CategoryListMobile;