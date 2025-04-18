import {useDispatch, useSelector} from "react-redux";

const AddExponentMeetPopup = () => {
	const dispatch = useDispatch();
	const {item} = useSelector(state => state.multiModal.modals[0].modalData)

	return (
		<div className={'i_delete-distributor-catalog-popup'}>
			<div className="i_popup-title">
				<span>Хотите занять стол на 10:30 - 11:00 ? <br/><br/> Встреча с {item.name}</span>
			</div>
			<div className="i_popup-buttons">
				<div className="i_popup-button-success" onClick={()=>{}}>
					<button>Да</button>
				</div>
				<div className="i_popup-button-cancel" onClick={()=>{
					dispatch({type: "SWITCH_POPUP", popupType: null, popupIsOpen: false, currentCatalogItem: null})
				}}>
					<button>Нет</button>
				</div>
			</div>
		</div>
	)
}

export default AddExponentMeetPopup;