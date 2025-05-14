import {useDispatch, useSelector} from "react-redux";
import {api} from "@/api/index.js";
import Cookies from "js-cookie";
import Toast from "@/utils/ui/Toast/Toast.jsx";
import {useTranslation} from "react-i18next";

const AddExponentMeetPopup = () => {
	const dispatch = useDispatch();
	const {item} = useSelector(state => state.multiModal.modals[0].modalData)
	const popupData = useSelector(state => state.multiPopup.popupData)
	const expoUserId = Cookies.get('expo_user_id')
	const currentExponentMeetingDate = useSelector(state => state.exponent.exponentMeeting.currentExponentMeetingDate)
	const currentExponentCode = useSelector(state => state.exponent.currentExponentCode)
	const {t} = useTranslation()
	const formSubmit = async () => {
		try{

			const body  = {
				slot: popupData.item.id,
				exponent_id: item.id,
				client_id: expoUserId,
				date: currentExponentMeetingDate,
				expo: currentExponentCode
			}

			const response = await api.exponentApi.addExpoMeeting(body)

			if(response.status === true) {
				const updatedMeetingSlotList = await api.exponentApi.getExpoMeetingList({exponent_id: item.id, date: currentExponentMeetingDate})
				Toast(response.message, 'success');

				if(response.status === true) {
					dispatch({type: "SET_EXPONENT_MEETING_SLOT", exponentMeetingSlotList: updatedMeetingSlotList.slots})
					dispatch({type: "SWITCH_POPUP", popupType: null, popupIsOpen: false, currentCatalogItem: null, popupData: null})
				}
			}else{
				dispatch({type: "SWITCH_POPUP", popupType: null, popupIsOpen: false, currentCatalogItem: null, popupData: null})
				Toast(response.message, 'error');
			}
			console.log(response)
		}catch (e) {
			console.log(e)
		}
	}

	return (
		<div className={'i_delete-distributor-catalog-popup'}>
			<div className="i_popup-title">
				<span>{t("MEETING_POPUP_QUESTION")} {popupData.item.time} ? <br/><br/> {t("MEETING_WITH")} {item.name}</span>
			</div>
			<div className="i_popup-buttons">
				<div className="i_popup-button-success" onClick={()=>{
					dispatch({type: "SWITCH_POPUP", popupType: null, popupIsOpen: false, currentCatalogItem: null, popupData: null})
				}}>
					<button>{t("NO")}</button>
				</div>
				<div className="i_popup-button-cancel" onClick={formSubmit}>
					<button>{t("YES")}</button>
				</div>
			</div>
		</div>
	)
}

export default AddExponentMeetPopup;