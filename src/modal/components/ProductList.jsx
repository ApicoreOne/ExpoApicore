import {useSelector, useDispatch} from "react-redux";
import {api} from "../../api";
import {useEffect, useState} from "react";
import infoImg from "../../images/info.svg";
import Cookies from "js-cookie";
import StarLined from '../../images/texpo/star-lined.svg?react'
import StarFilled from '../../images/texpo/star-filled.svg?react'
import {useTranslation} from "react-i18next";

const ProductList = ({productList, hideProductCard}) => {
	const dispatch = useDispatch();
	const nextOffset = useSelector(state => state.catalog.productList.nextOffset);
	const [showMore, setShowMore] = useState(true);
	const catalogHash = useSelector(state => state.multiModal.modals[0].modalData.hash);
	const cookiesFavoriteProduct = Cookies.get('favoriteProduct')
	const favoriteProductStore = useSelector(state => state.favorite.favoriteList)
	const [favoriteProduct, setFavoriteProduct] = useState(cookiesFavoriteProduct ? JSON.parse(cookiesFavoriteProduct) : [])
	const {t} = useTranslation(); // Переводы
	const currentExponentCode = useSelector(state => state.exponent.exponentData.code)

	useEffect(() => {
		setFavoriteProduct(favoriteProductStore)
	}, [favoriteProductStore])

	const addToFavorite = (e, productID) => {
		e.stopPropagation();

		// Получаем текущее состояние избранных продуктов для всех выставок
		const updatedFavoriteProduct = {...favoriteProduct};

		// Инициализируем список для текущей выставки, если он отсутствует
		if (!updatedFavoriteProduct[currentExponentCode]) {
			updatedFavoriteProduct[currentExponentCode] = [];
		}

		// Проверяем, есть ли productID в массиве текущей выставки
		if (updatedFavoriteProduct[currentExponentCode].includes(productID)) {
			// Если продукт уже есть в массиве, удаляем его
			updatedFavoriteProduct[currentExponentCode] = updatedFavoriteProduct[currentExponentCode].filter(item => item !== productID);
		} else {
			// Если продукта нет, добавляем его
			updatedFavoriteProduct[currentExponentCode].push(productID);
		}

		console.log(updatedFavoriteProduct);

		// Сохраняем изменения в store и куках
		dispatch({type: "SET_FAVORITE_LIST", favoriteList: updatedFavoriteProduct});
		setFavoriteProduct(updatedFavoriteProduct);
		Cookies.set('favoriteProduct', JSON.stringify(updatedFavoriteProduct), {expires: 365});
	};

	//Функция для открытия модального окна с информацией о товаре
	const openCatalogDetailModal = (id) => {
		dispatch({type: "OPEN_MODAL", modalLevel : 2 ,modalType: "productDetailModal", modalData: {productId : id}, modalWidth: 'large'})
	}

	useEffect(() => {
		if (nextOffset === null || nextOffset === 'undefined') {
			setShowMore(false)
		}else if(nextOffset >= 100){
			setShowMore(true)
		}
	}, [nextOffset])

	//Функция для подгрузки товаров
	const loadMore = async () => {
		try {
			const productList = await api.exponentApi.getCatalogProductList({hash: catalogHash});

			dispatch({
				type: "GET_MORE_PRODUCT_LIST",
				productList: productList.products,
				offset: productList.offset,
				nextOffset: productList.next_offset
			})
			if (!productList.next_offset) {
				setShowMore(false)
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			<div className="i_catalog-product-head">
				<div className="i_catalog-product-head-item active">
					<span>{t("PRODUCT_ACTIVE")}</span>
				</div>
				<div className="i_catalog-product-head-item id">
					<span>{t("PRODUCT_ID")}</span>
				</div>
				<div className="i_catalog-product-head-item image">
					<span></span>
				</div>
				<div className="i_catalog-product-head-item name">
					<span>{t("PRODUCT_NAME")}</span>
				</div>
				<div className="i_catalog-product-head-item quantity">
					<span>{t("PRODUCT_QUANTITY")}</span>
				</div>
				<div className="i_catalog-product-head-item price">
					<span>{t("PRODUCT_PRICE")}</span>
				</div>
			</div>
			<div className="i_catalog-product-items">
				{productList?.length === 0 && (
					<div className="i_catalog-product-empty">
						<div className="i_catalog-page-empty-title">
							<img src={infoImg} alt=""/>
							<span>{t("PRODUCT_EMPTY")}</span>
						</div>
					</div>
				)}
				{
					productList?.length > 0 ? productList?.map((product, index) => {
						let price = product.prices && product.prices.price !== 'null' ? product.prices.print_price : t('PRODUCT_PRICE_EMPTY');
						return (
							<div className={`i_catalog-product-item`} key={product.id} onClick={() => {
								openCatalogDetailModal(product.id)
							}}>
								<div className="i_catalog-product-item-active">
									<div className={`item-circle ${product.active ? 'active' : ''}`}></div>
								</div>
								<div className="i_catalog-product-item-id">
									<span>{product.id}</span>
								</div>
								<div className="i_catalog-product-item-image">
									<img src={product.image} alt=""/>
								</div>
								<div className="i_catalog-product-item-name">
									<span>{product.name}</span>
								</div>
								<div className="i_catalog-product-item-quantity">
									<span className={'i_catalog-product-item-title'}>{t("PRODUCT_QUANTITY")}: </span>
									<span>{product.order ? t("ORDER_TITLE") : product.quantity}</span>
								</div>
								<div className="i_catalog-product-item-price">
									<span className={'i_catalog-product-item-title'}>{t("PRODUCT_PRICE")}: </span>
									<span>{price ? price : t('PRODUCT_PRICE_EMPTY')}</span>
								</div>
								<div className="i_catalog-product-item-favorite" onClick={(e) => {
									addToFavorite(e, product.id)
								}}>
									{
										favoriteProduct[currentExponentCode]?.includes(product.id) ? <StarFilled/> : <StarLined/>
									}
								</div>
							</div>
						);
					}) : ''
				}
				{showMore && (
					<div className={'i_catalog-product-more'}>
						<span onClick={() => {
							loadMore()
						}}>{t("MORE_TITLE")}</span>
					</div>
				)}
			</div>

		</>
	)
}

export default ProductList;