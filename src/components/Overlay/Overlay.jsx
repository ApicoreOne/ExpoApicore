import {useDispatch, useSelector} from "react-redux";
import styles from './Overlay.module.scss';

const Overlay = () =>{
	const dispatch = useDispatch();
	const modalIsOpenLevel1 = useSelector(state => state.multiModal.modals[0].modalIsOpen);
	const modalIsOpenLevel2 = useSelector(state => state.multiModal.modals[1].modalIsOpen);
	const modalIsOpenLevel3 = useSelector(state => state.multiModal.modals[2].modalIsOpen);
	const changeShowOverlay = (lvl) =>{
		dispatch({type: "CLOSE_MODAL", modalLevel: lvl})
	}

	return(
		<>
			<div
				className={`${styles.overlay} ${modalIsOpenLevel1 ? '' : styles.hide}`}
				onClick={() => changeShowOverlay(1)}></div>
			<div
				className={`${styles.overlay} ${modalIsOpenLevel2 ? '' : styles.hide}`}
				onClick={() => changeShowOverlay(2)}></div>
			<div
				className={`${styles.overlay} ${modalIsOpenLevel3 ? '' : styles.hide}`}
				onClick={() => changeShowOverlay(3)}></div>
		</>
	)
}

export default Overlay;