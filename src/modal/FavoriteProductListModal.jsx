import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {api} from "../api";
import FavoriteProductList from "./components/FavoriteProductList";
import {useTranslation} from "react-i18next";

const FavoriteProductListModal = () => {

	const favoriteProductStore = useSelector(state => state.favorite.favoriteList)
	const [productListState, setProductListState] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const currentExponentCode = useSelector(state => state.exponent.exponentData.code)
	const {t} = useTranslation(); // Переводы

	const getData = async () => {
		const response = await api.exponentApi.getFavoriteList({id: favoriteProductStore, expo: currentExponentCode})
		setProductListState(response.products)
		setIsLoading(false)
	}

	useEffect(() => {
		getData()
	}, [favoriteProductStore, currentExponentCode]);


	return (
		<div className="i_modal-favorite-product">
			<div className="i_catalog-title">
				<span>{t("FAVORITE_PRODUCT_TITLE")}</span>
			</div>
			<div className={`i_catalog-page`}>
				{!isLoading && (
					<div className={`i_catalog-main ${!productListState ? 'empty' : ''}`}>
						{/*Выводим список товаров*/}
						<div className={`i_catalog-product favorite-list`}>
							<FavoriteProductList productList={productListState} hideProductCard={true}/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default FavoriteProductListModal;