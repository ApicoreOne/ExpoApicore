import closeBtn from '../../images/closeModal.svg'
import {useDispatch, useSelector} from "react-redux";
import AddExponentMeetPopup from "@/popup/AddExponentMeetPopup/AddExponentMeetPopup.jsx";

const MultiPopup = () => {

	const dispatch = useDispatch();

	const popupIsOpen = useSelector(state => state.multiPopup.popupIsOpen);
	const popupType = useSelector(state => state.multiPopup.popupType);
	const popupLarge = useSelector(state => state.multiPopup.popupLarge);


	const closeModal = () =>{
		dispatch({type: "SWITCH_POPUP", popupType: null, popupIsOpen: false})
	}

	return(
		<div className={`i_multi_popup ${!popupIsOpen ? 'hide' : ''} ${popupLarge ? 'large' : ''}`}>
			<div className="i_container">
				<div className={`i_multi_popup-close`} onClick={()=>{closeModal()}}>
					<img src={closeBtn} alt="close"/>
				</div>

				{/*В зависимоти от переданного значения будет открываться определенное модальное окно*/}
				{popupType === 'addExponentMeetPopup' && <AddExponentMeetPopup />}
			</div>
		</div>
	)
}

export default MultiPopup;