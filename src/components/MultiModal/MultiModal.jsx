import styles from './MultiModal.module.scss';
import {useDispatch, useSelector} from "react-redux";

import closeBtn from '@/images/closeModal.svg'
import QRModal from "@/modal/QRModal/QRModal";
import {useEffect} from "react";
import ExpoRegisterUser from "@/modal/ExpoRegisterUser/ExpoRegisterUser.jsx";
import ModalCatalogList from "@/modal/ModalCatalogList/ModalCatalogList.jsx";
import ProductDetailModal from "@/modal/ProductDetailModal.jsx";
import CategoryListMobileModal from "@/modal/CategoryListMobileModal.jsx";
import FavoriteProductListModal from "@/modal/FavoriteProductListModal.jsx";
import AuthFormModal from "@/modal/AuthFormModal/AuthFormModal.jsx";
import ExponentMeetModal from "@/modal/ExponentMeetModal/ExponentMeetModal.jsx";
import {useUrlParams, useViewportHeight, useWindowWidth} from "@/hooks/index.js";
import DistributorExponentMeetModal from "@/modal/DistributorExponentMeetModal/DistributorExponentMeetModal.jsx";
import ExponentDetailModal from "@/modal/ExponentDetailModal/ExponentDetailModal.jsx";

const MultiModal = () => {

	const dispatch = useDispatch();
	const modals = useSelector(state => state.multiModal.modals);

	const viewportHeight = useViewportHeight();
	const windowWidth = useWindowWidth();


	const { removeParam } = useUrlParams();

	const closeModal = (modalLevel) =>{
		dispatch({type: "CLOSE_MODAL", modalLevel: modalLevel})
		dispatch({type: "CLEAR_EXPONENT_MEETING"})

		if(modalLevel === 1){
			removeParam('catalog')
		}
	}
	// Локаем страницу и делаем так чтобы он не прыгал
	useEffect(() => {
		const hasOpenModal = modals.some(modal => modal.modalIsOpen);

		if (hasOpenModal) {
			const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = `${scrollBarWidth}px`;
		} else {
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
		}

		return () => {
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
		};
	}, [modals]);


	return (
		modals.map((modal, index) => {
			return (
				<div
					className={`${styles.multiModal} ${!modal.modalIsOpen ? styles.hide : ''} ${modal.modalWidth ? styles[modal.modalWidth] : ''} ${styles[`modalLevel${modal.modalLevel}`]}`}
					key={index}
					style={{height: viewportHeight}}
				>
					<div className={styles.container}>
						<div className={styles.closeButton} onClick={() => {
							closeModal(modal.modalLevel)
						}}>
							<img src={`${closeBtn}`} alt="close"/>
						</div>

						{/*В зависимоти от переданного значения будет открываться определенное модальное окно*/}
						{modal.modalType === 'qrModal' && <QRModal/>}
						{modal.modalType === 'expoRegisterUser' && <ExpoRegisterUser/>}
						{modal.modalType === 'modalCatalogList' && <ModalCatalogList/>}
						{modal.modalType === 'productDetailModal' && <ProductDetailModal/>}
						{modal.modalType === 'categoryListMobileModal' && <CategoryListMobileModal />}
						{modal.modalType === 'favoriteProductListModal' && <FavoriteProductListModal />}
						{modal.modalType === 'authFormModal' && <AuthFormModal />}
						{modal.modalType === 'exponentMeetModal' && <ExponentMeetModal />}
						{modal.modalType === 'distributorExponentMeetModal' && <DistributorExponentMeetModal />}
						{modal.modalType === 'exponentDetailModal' && <ExponentDetailModal />}
					</div>
				</div>
			)
		})
	);
}

export default MultiModal;