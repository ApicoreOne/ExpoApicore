import Svg from "../../images/close-list.svg?react"
import {useDispatch, useSelector} from "react-redux";

const CloseCatalogs = () => {

	const dispatch = useDispatch();
	const categoryList = useSelector(state => state.catalog.categoryList.categoryList);


	// Рекурсивно обновляет список категорий
	function updateActiveList(list){
		return list.map((item) => {
			if(item.has_children){
				item.is_show = false;
			}
			return item
		})
	}

	// Функция closeCatalogs открывает каталоги
	function closeCatalogs() {
		let updatedList = updateActiveList(categoryList)
		dispatch({type: "SET_CATALOG_CATEGORY_LIST", categoryList: updatedList})
	}

	return (
		<div className={`i_tools-item ${categoryList?.length === 0 ? 'disabled' : ''}`}
		     onMouseEnter={() => dispatch({type: "SWITCH_CURSOR_HELP", show: true, content: 'Свернуть категории'})}
		     onMouseLeave={() => dispatch({type: "SWITCH_CURSOR_HELP", show: false})}
		     onClick={closeCatalogs}
		>
			<Svg />
		</div>
	)
}

export default CloseCatalogs;