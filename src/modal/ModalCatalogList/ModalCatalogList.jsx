import {api} from "@/api";
import {useEffect, useState} from "react";
import ProductList from "@/modal/components/ProductList";
import {useDispatch, useSelector} from "react-redux";
import OpenCatalogs from "@/modal/components/OpenCatalogs";
import CloseCatalogs from "@/modal/components/CloseCatalogs";
import CategoryListNew from "@/modal/components/CategoryListNew";
import CategoryListMobile from "@/modal/components/CategoryListMobile.jsx";

const ModalCatalogList = () =>{
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useDispatch();
	const catalogHash = useSelector(state => state.multiModal.modals[0].modalData.hash);
	const [catalogName, setCatalogName] = useState(null);

	//Достаем список категорий и товаров
	const getList = async () => {
		try {
			const categoryList = await api.exponentApi.getCatalogCategoryList({hash: catalogHash});
			const productList = await api.exponentApi.getCatalogProductList({hash: catalogHash});

			//Записываем в стейт список товаров
			dispatch({type: "GET_PRODUCT_LIST", productList: productList.products, offset: productList.offset, nextOffset: productList.next_offset || null})
			dispatch({type: "SET_CATALOG_CATEGORY_LIST", categoryList: categoryList.categories})
			setCatalogName(categoryList.distributor_name)

			setIsLoading(false)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		// Устанавливаем текущий мультитул
		// dispatch({type: "SET_MULTITOOLS", currentTools: "catalogs-distributor-inner"})

		// Получаем список категорий и товаров
		getList()
	}, [])

	//Достаем список товаров из стейта
	const productListState = useSelector(state => state.catalog.productList.productList);

	return(
		<>
			<div className="i_catalog-title">
				<span>{catalogName}</span>
			</div>
			<div className={`i_catalog-page`}>
				{!isLoading && (
					<div className={`i_catalog-main`}>
						{/*Выводим список категорий с вложенностями*/}
						<div className="i_catalog-category">
							<div className="i_catalog-tools">
								<div></div>
								<div className="i_catalog-tools-right">
									<OpenCatalogs/>
									<CloseCatalogs/>
								</div>
							</div>
							<div className="i_catalog-category-items">
								<CategoryListNew/>
							</div>
						</div>

						{/*Мобильная версия категорий*/}
						<CategoryListMobile/>

						{/*Выводим список товаров*/}
						<div className="i_catalog-product">
							<ProductList productList={productListState} hideProductCard={true}/>
						</div>
					</div>

				)}
			</div>
		</>
	)
}

export default ModalCatalogList;