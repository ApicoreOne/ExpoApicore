import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import infoImg from "@/images/info.svg";
import Cookies from "js-cookie";
import emptySvg from '@/images/texpo/empty-box.svg'
import StarFilled from "@/images/texpo/star-filled.svg?react";

const FavoriteProductList = ({productList, hideProductCard}) => {
	const dispatch = useDispatch();
	const nextOffset = useSelector(state => state.catalog.productList.nextOffset);
	const [showMore, setShowMore] = useState(true);
	const cookiesFavoriteProduct = Cookies.get('favoriteProduct')
	const favoriteProductStore = useSelector(state => state.favorite.favoriteList)
	const [favoriteProduct, setFavoriteProduct] = useState(cookiesFavoriteProduct ? JSON.parse(cookiesFavoriteProduct) : [])

	useEffect(() => {
		setFavoriteProduct(favoriteProductStore)
	}, [favoriteProductStore])

	const removeToFavorite = (e, productID) => {
		e.stopPropagation();
		let updatedFavoriteProduct
		// Проверяем, есть ли productID в массиве favoriteProduct
		if (favoriteProduct.includes(productID)) {
			// Если продукт уже есть в массиве, удаляем его
			updatedFavoriteProduct = favoriteProduct.filter(item => item !== productID)
		} else {
			// Если продукта нет, добавляем его
			updatedFavoriteProduct = [...favoriteProduct]
		}

		dispatch({type: "SET_FAVORITE_LIST", favoriteList: updatedFavoriteProduct})
		setFavoriteProduct(updatedFavoriteProduct)

		Cookies.set('favoriteProduct', JSON.stringify(updatedFavoriteProduct), {expires: 365})
	}

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
	// const loadMore = async () => {
	// 	try {
	// 		const productList = await api.texpoApi.getCatalogProductList({hash: catalogHash});
	//
	// 		dispatch({
	// 			type: "GET_MORE_PRODUCT_LIST",
	// 			productList: productList.products,
	// 			offset: productList.offset,
	// 			nextOffset: productList.next_offset
	// 		})
	// 		if (!productList.next_offset) {
	// 			setShowMore(false)
	// 		}
	// 	} catch (e) {
	// 		console.log(e)
	// 	}
	// }

	return (
		<>
			{productList && productList.length > 0 ? (
				<>
					<div className="i_catalog-product-head">
						<div className="i_catalog-product-head-item name">
							<span>Название</span>
						</div>
						<div className="i_catalog-product-head-item distributor-name">
							<span>Экспонент</span>
						</div>

					</div>
					<div className="i_catalog-product-items">
						{productList.length === 0 && (
							<div className="i_catalog-product-empty">
								<div className="i_catalog-page-empty-title">
									<img src={infoImg} alt=""/>
									<span>Товары отсутствуют.</span>
								</div>
							</div>
						)}
						{
							productList.length > 0 ? productList.map((product, index) => {
								return (
									<div className={`i_catalog-product-item`} key={product.id} onClick={() => {
										openCatalogDetailModal(product.id)
									}}>
										<div className="i_catalog-product-item-name">
											<span>{product.name}</span>
										</div>
										<div className="i_catalog-product-item-distributor-name">
											<span>{product.distributor_name.name}</span>
										</div>
										<div className="i_catalog-product-item-favorite" onClick={(e) => {
											removeToFavorite(e, product.id)
										}}>
											<StarFilled />
										</div>
									</div>
								);
							}) : ''
						}
						{/*{showMore && (*/}
						{/*	<div className={'i_catalog-product-more'}>*/}
						{/*		<span onClick={() => {*/}
						{/*			loadMore()*/}
						{/*		}}>Ещё</span>*/}
						{/*	</div>*/}
						{/*)}*/}
					</div>
				</>
			) : (
				<div className={'i_empty-list'}>
					<div className={'i_empty-list-title'}>
						<span>Ваш список избранных товаров пуст</span>
						<img src={emptySvg} alt=""/>
					</div>
				</div>
			)}
		</>
	)
}

export default FavoriteProductList;