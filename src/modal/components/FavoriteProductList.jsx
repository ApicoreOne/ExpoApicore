import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import infoImg from "@/images/info.svg";
import Cookies from "js-cookie";
import emptySvg from '@/images/texpo/empty-box.svg'
import StarFilled from "@/images/texpo/star-filled.svg?react";
import {useTranslation} from "react-i18next";

const FavoriteProductList = ({productList, hideProductCard}) => {
	const dispatch = useDispatch();
	const nextOffset = useSelector(state => state.catalog.productList.nextOffset);
	const currentExponentCode = useSelector(state => state.exponent.exponentData.code);
	const cookiesFavoriteProduct = Cookies.get('favoriteProduct');
	const [favoriteProduct, setFavoriteProduct] = useState(
		cookiesFavoriteProduct ? JSON.parse(cookiesFavoriteProduct) : {}
	);
	const {t} = useTranslation(); // Переводы

	const favoriteProductStore = useSelector(state => state.favorite.favoriteList);

	useEffect(() => {
		setFavoriteProduct(favoriteProductStore);
	}, [favoriteProductStore]);

	const removeFromFavorite = (e, productID) => {
		e.stopPropagation();

		const currentFavorites = favoriteProduct[currentExponentCode] || [];
		const updatedFavorites = currentFavorites.includes(productID)
			? currentFavorites.filter(id => id !== productID)
			: currentFavorites;

		const updatedFavoriteProduct = {
			...favoriteProduct,
			[currentExponentCode]: updatedFavorites,
		};

		// Обновляем Redux store
		dispatch({type: "SET_FAVORITE_LIST", favoriteList: updatedFavoriteProduct});
		// Обновляем локальное состояние
		setFavoriteProduct(updatedFavoriteProduct);
		// Сохраняем данные в cookies
		Cookies.set('favoriteProduct', JSON.stringify(updatedFavoriteProduct), {expires: 365});
	};

	//Функция для открытия модального окна с информацией о товаре
	const openCatalogDetailModal = (id) => {
		dispatch({
			type: "OPEN_MODAL",
			modalLevel: 2,
			modalType: "productDetailModal",
			modalData: {productId: id},
			modalWidth: 'large'
		});
	};

	return (
		<>
			{productList && productList.length > 0 ? (
				<>
					<div className="i_catalog-product-head">
						<div className="i_catalog-product-head-item image">
							<span>{t("PRODUCT_IMAGE")}</span>
						</div>
						<div className="i_catalog-product-head-item name">
							<span>{t("PRODUCT_NAME")}</span>
						</div>
						<div className="i_catalog-product-head-item distributor-name">
							<span>{t("EXPONENT_TITLE")}</span>
						</div>
					</div>
					<div className="i_catalog-product-items">
						{productList.map((product) => (
							<div
								className={`i_catalog-product-item`}
								key={product.id}
								onClick={() => openCatalogDetailModal(product.id)}
							>
								<div className="i_catalog-product-item-image">
									<img src={product.images} alt=""/>
								</div>
								<div className="i_catalog-product-item-name">
									<span>{product.name}</span>
								</div>
								<div className="i_catalog-product-item-distributor-name">
									<span>{product.distributor_name?.name}</span>
								</div>
								<div
									className="i_catalog-product-item-favorite"
									onClick={(e) => removeFromFavorite(e, product.id)}
								>
									<StarFilled />
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<div className={'i_empty-list'}>
					<div className={'i_empty-list-title'}>
						<span>{t("FAVORITE_PRODUCT_TITLE_EMPTY")}</span>
						<img src={emptySvg} alt=""/>
					</div>
				</div>
			)}
		</>
	);
};

export default FavoriteProductList;
