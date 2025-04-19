import styles from './ExponentMeetItems.module.scss'
import {useDispatch, useSelector} from "react-redux";
import Toast from "@/utils/ui/Toast/Toast.jsx";

const ExponentMeetItems = () => {

	const dispatch = useDispatch()
	const exponentMeetingSlot = useSelector(state => state.exponent.exponentMeeting.exponentMeetingSlotList)

	//Открываем попап удаления типа цены
	const openPopup = (item) =>{
		if(item.status === 'busy'){
			Toast('Слот занят', 'error')
		}else{
			dispatch({type:'SWITCH_POPUP', popupType: 'addExponentMeetPopup', popupIsOpen: true, popupData: {item:item}})
		}
	}

	return(
		<div className={styles.exponentMeetItems}>
			{
				exponentMeetingSlot?.map(item => {
					return(
						<div className={styles.exponentMeetItem} onClick={()=>{openPopup(item)}}>
							<div className={styles.exponentMeetItemName}>
								<span>{item.time}</span>
							</div>

							<div className={`${styles.exponentMeetItemValue} ${styles[item.status]}`} >
								<span>{item.status === 'free' ? 'Свободен' : 'Занят'}</span>
							</div>
						</div>
					)
				})
			}

		</div>
	)
}

export default ExponentMeetItems