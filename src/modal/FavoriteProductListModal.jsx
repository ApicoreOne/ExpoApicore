import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {api} from "../api";
import FavoriteProductList from "./components/FavoriteProductList";
import {useTranslation} from "react-i18next";

const FavoriteProductListModal = () => {
	const favoriteProductStore = useSelector(state => state.favorite.favoriteList);
	const currentExponentCode = useSelector(state => state.exponent.exponentData.code);
	const [productListState, setProductListState] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const {t} = useTranslation(); // Переводы

	const getData = async () => {
		try {
			// Проверяем, существует ли список избранных товаров для текущего экспонента
			const favoriteList = favoriteProductStore[currentExponentCode] || [];
			if (favoriteList.length === 0) {
				setProductListState([]);
				setIsLoading(false);
				return;
			}

			// Запрашиваем данные избранных товаров с сервера
			const response = await api.exponentApi.getFavoriteList({id: favoriteList, expo: currentExponentCode});
			setProductListState(response.products || []);
		} catch (error) {
			console.error("Ошибка загрузки списка избранных товаров:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, [favoriteProductStore, currentExponentCode]);

	return (
		<div className="i_modal-favorite-product">
			<div className="i_catalog-title">
				<span>{t("FAVORITE_PRODUCT_TITLE")}</span>
			</div>
			<div className={`i_catalog-page`}>
				{!isLoading && (
					<div className={`i_catalog-main ${productListState.length === 0 ? 'empty' : ''}`}>
						{/*Выводим список товаров*/}
						<div className={`i_catalog-product favorite-list`}>
							<FavoriteProductList productList={productListState} hideProductCard={true} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FavoriteProductListModal;
