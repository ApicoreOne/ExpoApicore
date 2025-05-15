import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../api";

//MUI components
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import '../styles/customMui/customTabs.scss'

import DetailProps from "./components/ProductDetail/DetailProps";
import ImageSwiper from "./components/ProductDetail/ImageSwiper";
import DetailQuantity from "./components/ProductDetail/DetailQuantity";
import DetailPrice from "./components/ProductDetail/DetailPrice";

import Cookies from "js-cookie";

import closeBtn from '../images/burger-language-arrow.svg';
import infoImg from "../images/info.svg";
import StarLined from '../images/texpo/star-lined.svg?react'
import StarFilled from '../images/texpo/star-filled.svg?react'
import {useTranslation} from "react-i18next";


const ProductDetailModal = () => {
	const [productDetail, setProductDetail] = useState(null)
	const productId = useSelector(state => state.multiModal.modals[1].modalData.productId)
	const [itemShowCount, setItemShowCount] = useState(5)
	const [showMore, setShowMore] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useDispatch()
	const {t} = useTranslation(); // Переводы

	const cookiesFavoriteProduct = Cookies.get('favoriteProduct')
	const favoriteProductStore = useSelector(state => state.favorite.favoriteList)
	const [favoriteProduct, setFavoriteProduct] = useState(cookiesFavoriteProduct ? JSON.parse(cookiesFavoriteProduct) : [])
	const currentExponentCode = useSelector(state => state.exponent.exponentData.code)

	//Табы для props
	const [currentPropsTab, setCurrentPropsTab] = useState('props')

	const handleChangePropsTab = (event, newValue) => {
		setCurrentPropsTab(newValue);
	};

	//Табы для props
	const [currentLeftTab, setCurrentLeftTab] = useState('price')

	const handleChangeLeftTab = (event, newValue) => {
		setCurrentLeftTab(newValue);
	};

	//Получаем данные с сервера

	const getData = async () => {
		try {
			const productDetail = await api.exponentApi.getCatalogProductDetail({id: productId});
			setProductDetail(productDetail.product)

			// Ставлю искуственную задержку чтобы не лагала модалка при открытии
			setTimeout(() => {
				setIsLoading(false)
			},300)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	//Показываем больше свойств

	const showMoreProps = () => {
		if (itemShowCount === 5) {
			setItemShowCount(100)
			setShowMore(true)
		} else {
			setItemShowCount(5)
			setShowMore(false)
		}
	}

	useEffect(() => {
		setFavoriteProduct(favoriteProductStore);
	}, [favoriteProductStore]);

	// Функция добавления/удаления продукта в избранное
	const addToFavorite = (e, productID) => {
		e.stopPropagation();

		// Инициализация структуры избранных товаров, если она отсутствует
		const updatedFavoriteProduct = {...favoriteProduct};
		if (!Array.isArray(updatedFavoriteProduct[currentExponentCode])) {
			updatedFavoriteProduct[currentExponentCode] = [];
		}

		// Добавляем или удаляем продукт
		if (updatedFavoriteProduct[currentExponentCode].includes(productID)) {
			updatedFavoriteProduct[currentExponentCode] = updatedFavoriteProduct[currentExponentCode].filter(item => item !== productID);
		} else {
			updatedFavoriteProduct[currentExponentCode].push(productID);
		}

		// Обновляем состояние и куки
		dispatch({type: "SET_FAVORITE_LIST", favoriteList: updatedFavoriteProduct});
		setFavoriteProduct(updatedFavoriteProduct);
		Cookies.set('favoriteProduct', JSON.stringify(updatedFavoriteProduct), {expires: 365});
	};

	return (
		<>
			{/*Скелетон для прогрузки страницы*/}

			{!isLoading && productDetail && (
				<div className={`i_product-detail`}>
					<div className="i_product-detail-title">
						<span>{productDetail.name}</span>
					</div>
					<div className="i_product-detail-favorite" onClick={(e) => {
						addToFavorite(e, productDetail.id)
					}}>
						{
							Array.isArray(favoriteProduct[currentExponentCode]) && favoriteProduct[currentExponentCode].includes(productDetail.id)
								? <StarFilled/>
								: <StarLined/>
						}
					</div>
					<div className="i_product-detail-content">
						<div className="i_product-detail-content-left">
							{/*СВАЙПЕР*/}
							<div className="i_product-detail-images">
								{productDetail.images.length > 0 && (
									<ImageSwiper images={productDetail.images}/>
								)}
								{
									productDetail.images?.noimage && (
										<div className={'i_product-detail-noimage'}>
											<img src={productDetail.images.noimage} alt={'noimg'}/>
										</div>
									)
								}
							</div>

							<TabContext value={currentLeftTab} className={'i_tabs'}>
								{/*ТАБ ПАНЕЛЬ*/}
								<TabList onChange={handleChangeLeftTab}
								         indicatorColor={'transparent'}
								         className={'i_tabs-header i_tabs-header-left'}>
									<Tab label={t("PRODUCT_PRICE")} value="price" className={'i_tabs-header-item'}/>
									<Tab label={t("PRODUCT_QUANTITY")} value="quantity" className={'i_tabs-header-item'}/>
								</TabList>

								{/*ЦЕНЫ*/}
								<TabPanel value="price" className={'i_tabs-content-left'}>
									<DetailPrice price={productDetail.prices}/>
								</TabPanel>

								{/*ОСТАТКИ*/}
								<TabPanel value="quantity" className={'i_tabs-content-left'}>
									<DetailQuantity quantity={productDetail.quantity}/>
								</TabPanel>
							</TabContext>

						</div>
						<div className="i_product-detail-content-right">
							<div className="i_product-detail-props">
								<TabContext value={currentPropsTab} className={'i_tabs'}>

									{/*ВВЕРХНЯЯ ТАБ ПАНЕЛЬ*/}
									<TabList onChange={handleChangePropsTab}
									         indicatorColor={'transparent'}
									         className={'i_tabs-header'}
									         variant="scrollable"
									         scrollButtons="auto">
										<Tab label={t("PROPERTY_TITLE")} value="props" className={'i_tabs-header-item'}/>
									</TabList>

									{/*/!*АТРИБУТЫ*!/*/}
									{/*<TabPanel value="attributes">*/}
									{/*	<DetailAttribute attribute={productDetail} itemShowCount={itemShowCount}/>*/}
									{/*</TabPanel>*/}

									{/*СВОЙСТВА*/}
									{
										productDetail.props?.props && productDetail.props?.props !== 'null' ? (
												<TabPanel value="props" className={'i_tap-panel'}>
													<DetailProps props={productDetail.props.props}
													             itemShowCount={itemShowCount}/>


													{/*Показываем блок раскрытия таблицы свойств*/}
													{productDetail.props.props.length > 5 && (
														<div className={`i_show-more ${showMore ? 'show' : ''}`} onClick={showMoreProps}>
															<div className="i_show-more-img">
																<img src={`${closeBtn}`} alt=""/>
															</div>
														</div>
													)}

												</TabPanel>
											) :
											<>
												<TabPanel value="props" className={'i_tap-panel'}>
													<div className="i_product-props-empty">
														<div className="i_product-props-empty-title">
															<img src={`${infoImg}`} alt=""/>
															<span>{t('PROPERTY_EMPTY')}</span>
														</div>
													</div>
												</TabPanel>
											</>
									}

									{/*/!*ПАРАМЕТРЫ*!/*/}
									{/*{*/}
									{/*	productDetail.params && productDetail.params !== 'null' && (*/}
									{/*		<TabPanel value="params">*/}
									{/*			<DetailParams params={productDetail.params} itemShowCount={itemShowCount}/>*/}
									{/*		</TabPanel>*/}
									{/*	)*/}
									{/*}*/}
								</TabContext>

							</div>

							{/*ОПИСАНИЕ*/}
							<div className="i_product-detail-description">
								<span className="i_product-detail-content-title">{t("DESCRIPTION_TITLE")}</span>
								{productDetail.description?.description ? (
										<>
											<div dangerouslySetInnerHTML={{__html: productDetail.description.description}}></div>
										</>
									) :
									<>
										<div className="i_product-description-empty">
											<div className="i_product-description-empty-title">
												<img src={infoImg} alt=""/>
												<span>{t("DESCRIPTION_TITLE_EMPTY")}</span>
											</div>
										</div>
									</>}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default ProductDetailModal;