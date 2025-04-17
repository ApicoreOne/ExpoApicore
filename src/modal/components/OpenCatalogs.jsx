import Svg from "../../images/open-list.svg?react"
import {useDispatch, useSelector} from "react-redux";

const OpenCatalogs = () => {

	const dispatch = useDispatch();
	const categoryList = useSelector(state => state.catalog.categoryList.categoryList);

	// Рекурсивно обновляет список категорий
	function updateActiveList(list){
		return list.map((item) => {
			if(item.has_children){
				item.is_show = true;
			}
			return item
		})
	}

	// Функция openCatalogs открывает каталоги
	function openCatalogs() {
		let updatedList = updateActiveList(categoryList)
		dispatch({type: "SET_CATALOG_CATEGORY_LIST", categoryList: updatedList})
	}

	return (
		<div className={`i_tools-item ${categoryList?.length === 0 ? 'disabled' : ''}`}
		     onMouseEnter={() => dispatch({type: "SWITCH_CURSOR_HELP", show: true, content: 'Развернуть категории'})}
		     onMouseLeave={() => dispatch({type: "SWITCH_CURSOR_HELP", show: false})}
		     onClick={openCatalogs}
		>
			<Svg />
		</div>
	)
}

export default OpenCatalogs;