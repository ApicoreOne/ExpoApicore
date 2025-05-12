import {useSelector, useDispatch} from "react-redux";
import {api} from "../../api";
import {useEffect, useState} from "react";
import infoImg from "../../images/info.svg";
import Cookies from "js-cookie";
import StarLined from '../../images/texpo/star-lined.svg?react'
import StarFilled from '../../images/texpo/star-filled.svg?react'

const ProductList = ({productList, hideProductCard}) => {
	const dispatch = useDispatch();
	const nextOffset = useSelector(state => state.catalog.productList.nextOffset);
	const [showMore, setShowMore] = useState(true);
	const catalogHash = useSelector(state => state.multiModal.modals[0].modalData.hash);
	const cookiesFavoriteProduct = Cookies.get('favoriteProduct')
	const favoriteProductStore = useSelector(state => state.favorite.favoriteList)
	const [favoriteProduct, setFavoriteProduct] = useState(cookiesFavoriteProduct ? JSON.parse(cookiesFavoriteProduct) : [])

	useEffect(() => {
		setFavoriteProduct(favoriteProductStore)
	}, [favoriteProductStore])

	const addToFavorite = (e, productID) => {
		e.stopPropagation();
		let updatedFavoriteProduct
		// Проверяем, есть ли productID в массиве favoriteProduct
		if (favoriteProduct.includes(productID)) {
			// Если продукт уже есть в массиве, удаляем его
			updatedFavoriteProduct = favoriteProduct.filter(item => item !== productID)
		} else {
			// Если продукта нет, добавляем его
			updatedFavoriteProduct = [...favoriteProduct, productID]
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
					<span>Активн.</span>
				</div>
				<div className="i_catalog-product-head-item id">
					<span>ID</span>
				</div>
				<div className="i_catalog-product-head-item name">
					<span>Название</span>
				</div>
				<div className="i_catalog-product-head-item quantity">
					<span>Остаток</span>
				</div>
				<div className="i_catalog-product-head-item price">
					<span>Цена</span>
				</div>
			</div>
			<div className="i_catalog-product-items">
				{productList?.length === 0 && (
					<div className="i_catalog-product-empty">
						<div className="i_catalog-page-empty-title">
							<img src={infoImg} alt=""/>
							<span>Товары отсутствуют.</span>
						</div>
					</div>
				)}
				{
					productList?.length > 0 ? productList?.map((product, index) => {
						let price = product.prices && product.prices.price !== 'null' ? product.prices.price : 'Нет цены';
						return (
							<div className={`i_catalog-product-item`} key={product.id} onClick={()=>{
								openCatalogDetailModal(product.id)
							}}>
								<div className="i_catalog-product-item-active">
									<div className={`item-circle ${product.active ? 'active' : ''}`}></div>
								</div>
								<div className="i_catalog-product-item-id">
									<span>{product.id}</span>
								</div>
								<div className="i_catalog-product-item-name">
									<span>{product.name}</span>
								</div>
								<div className="i_catalog-product-item-quantity">
									<span className={'i_catalog-product-item-title'}>Остаток: </span>
									<span>{product.order ? 'На заказ' : product.quantity}</span>
								</div>
								<div className="i_catalog-product-item-price">
									<span className={'i_catalog-product-item-title'}>Цена: </span>
									<span>{price ? price : 'Нет цены'}</span>
								</div>
								<div className="i_catalog-product-item-favorite" onClick={(e)=>{addToFavorite(e, product.id)}}>
									{
										favoriteProduct?.includes(product.id) ? <StarFilled /> : <StarLined />
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
						}}>Ещё</span>
					</div>
				)}
			</div>

		</>
	)
}

export default ProductList;