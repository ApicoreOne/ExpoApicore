import styles from './ExponentMeetItems.module.scss'
import {useDispatch, useSelector} from "react-redux";

const ExponentMeetItems = () => {

	const dispatch = useDispatch()

	const meetSlot = [
		{id: 0, name: '10:00 - 10:30'},
		{id: 1, name: '10:30 - 11:00'},
		{id: 2, name: '11:00 - 11:30'},
		{id: 3, name: '11:30 - 12:00'},
		{id: 4, name: '12:00 - 12:30'},
		{id: 5, name: '12:30 - 13:00'},
		{id: 6, name: '13:00 - 13:30'},
		{id: 7, name: '13:30 - 14:00'},
		{id: 8, name: '14:00 - 14:30'},
		{id: 9, name: '14:30 - 15:00'},
		{id: 10, name: '15:00 - 15:30'},
		{id: 11, name: '15:30 - 16:00'},
		{id: 12, name: '16:00 - 16:30'},
		{id: 13, name: '16:30 - 17:00'},
		{id: 14, name: '17:00 - 17:30'},
		{id: 15, name: '17:30 - 18:00'},
	];

	//Открываем попап удаления типа цены
	const openPopup = (code) =>{
		dispatch({type:'SWITCH_POPUP', popupType: 'addExponentMeetPopup', popupIsOpen: true, currentPriceTypeItem: code})
	}

	return(
		<div className={styles.exponentMeetItems}>
			{
				meetSlot.map(item => {
					return(
						<div className={styles.exponentMeetItem} onClick={openPopup}>
							<div className={styles.exponentMeetItemName}>
								<span>{item.name}</span>
							</div>

							<div className={styles.exponentMeetItemValue}>
								<span>Свободен</span>
							</div>
						</div>
					)
				})
			}

		</div>
	)
}

export default ExponentMeetItems