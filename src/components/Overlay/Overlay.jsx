import {useDispatch, useSelector} from "react-redux";
import styles from './Overlay.module.scss';
import {useUrlParams} from "@/hooks/index.js";

const Overlay = () =>{
	const dispatch = useDispatch();
	const modalIsOpenLevel1 = useSelector(state => state.multiModal.modals[0].modalIsOpen);
	const modalIsOpenLevel2 = useSelector(state => state.multiModal.modals[1].modalIsOpen);
	const modalIsOpenLevel3 = useSelector(state => state.multiModal.modals[2].modalIsOpen);
	const popupIsOpen = useSelector(state => state.multiPopup.popupIsOpen);

	const { removeParam } = useUrlParams();

	const changeShowOverlay = (lvl) =>{
		dispatch({type: "CLOSE_MODAL", modalLevel: lvl})
		dispatch({type: "SWITCH_POPUP", popupType: null, popupIsOpen: false, currentCatalogItem: null, popupData: null})


		if(lvl === 1){
			removeParam('catalog')
			dispatch({type: "CLEAR_EXPONENT_MEETING"})
		}
	}

	return(
		<>
			<div
				className={`${styles.overlay} ${styles.overlayLevel_1} ${modalIsOpenLevel1 ? '' : styles.hide}`}
				onClick={() => changeShowOverlay(1)}></div>
			<div
				className={`${styles.overlay} ${styles.overlayLevel_2} ${modalIsOpenLevel2 ? '' : styles.hide} `}
				onClick={() => changeShowOverlay(2)}></div>
			<div
				className={`${styles.overlay} ${styles.overlayLevel_3} ${modalIsOpenLevel3 || popupIsOpen ? '' : styles.hide}`}
				onClick={() => changeShowOverlay(3)}></div>
		</>
	)
}

export default Overlay;