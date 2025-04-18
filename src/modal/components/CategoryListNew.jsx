import {useDispatch, useSelector} from "react-redux";
import minus from "../../images/catalogs/category/minus.svg";
import plus from "../../images/catalogs/category/plus.svg";
import {api} from "../../api";

// Рекурсивный компонент для отображения категорий
const Category = ({ category, categories , modalLevel}) => {
	// Находим подкатегории для текущей категории
	const subCategories = categories.filter(subCategory => subCategory.parent_id === category.id);
	const dispatch = useDispatch();
	const level = category.depth_level;
	const currentCategoryId = useSelector(state => state.catalog.categoryList.currentCategoryId);
	const catalogHash = useSelector(state => state.multiModal.modals[0].modalData.hash);

	// Делаем запрос на выбранный каталог для показа товаров
	const changeProductList = async (id, name) => {

		dispatch({type: "SET_CATALOG_CURRENT_CATEGORY_ID", currentCategoryId: id})
		dispatch({type: "SET_CATALOG_CURRENT_CATEGORY_NAME", currentCategoryName: name})

		try {
			let body = {
				"hash": catalogHash,
				"offset": 0,
				"filter": {"category_id": id}
			}

			const productList = await api.exponentApi.getCatalogProductList(body);

			if (!productList.next_offset) {
				dispatch({
					type: "GET_PRODUCT_LIST",
					productList: productList.products,
					offset: productList.offset,
					nextOffset: null,
					currentCategoryId: id
				})
			} else {
				dispatch({
					type: "GET_PRODUCT_LIST",
					productList: productList.products,
					offset: productList.offset,
					nextOffset: productList.next_offset,
					currentCategoryId: id
				})
			}

			//После изменения категории делаем плавный скролл наверх в productlist
			const catalogProductItems = document.querySelector('.i_catalog-product-items');
			catalogProductItems.scrollTo({top: 0});

			if(modalLevel === 2){
				dispatch({type: "CLOSE_MODAL", modalLevel: 2})
			}

		} catch (e) {
			console.log(e)
		}
	}

	// Делаем активной выбранную категорию
	function changeSelectedItem(id){
		let updatedItem = categories.map((item) => {
			if(item.id === id){
				item.is_active = true;
				changeProductList(id, item.name)
			}else{
				item.is_active = false;
			}

			return item
		})

		dispatch({type: "SET_CATALOG_CATEGORY_LIST", categoryList: updatedItem})
	}

	// Если у категории нет дочерних элементов то расскрвыаем ее по нажатию на круг
	function changeIsShow(id){
		let updatedItem = categories.map((item) => {
			if(item.id === id && item.has_children){
				item.is_show = !item.is_show
			}else{
				return item
			}
			return item
		})

		dispatch({type: "SET_CATALOG_CATEGORY_LIST", categoryList: updatedItem})
	}

	return (
		<div className={`i_catalog-category-item ${category.is_show ? 'active' : ''} i_catalog-category-item-level-${level} ${!category.has_children ? 'last-child' : ''}`}
		     style={{paddingLeft: level === 0 ? '0' : '20px'}}>
			<div className={`i_catalog-category-item-title ${currentCategoryId === category.id ? 'selected' : ''}`}
				onClick={() => { changeSelectedItem(category.id)} }
			>
				{
					category.id !== 0 && (
						<div
							className={`i_catalog-title-circle ${!category.has_children ? '' : 'last-child'} ${currentCategoryId === category.id ? 'active' : category.is_active ? 'active' : ''}`}
							onClick={(e) => {
								e.stopPropagation();
								category.has_children && changeIsShow(category.id)
							}}
						>
							{category.is_show && category.has_children ?
								<img src={minus} alt="-"/> : (!category.has_children ? null : <img src={plus} alt="+"/>)}
						</div>
					)
				}
				{category.name}
			</div>
			{
				category.id !== 0 && (
					subCategories.map(subCategory => (
						<Category key={subCategory.id} category={subCategory} categories={categories} modalLevel={modalLevel}/>
					))
				)
			}

		</div>
	);
};

const CategoryListNew = ({modalLevel}) => {
	// Находим корневые категории (parent_id === 0)
	const categories = useSelector(state => state.catalog.categoryList.categoryList);

	const rootCategories = categories?.filter(category => category.parent_id === 0 || category.id === 0);

	return (
		<div>
			{rootCategories?.map(category => (
				<Category key={category.id} category={category} categories={categories} modalLevel={modalLevel}/>
			))}
		</div>
	);
};

export default CategoryListNew;


