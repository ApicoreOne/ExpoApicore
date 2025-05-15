import styles from './DistributorExponentMeetItems.module.scss'
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const DistributorExponentMeetItems = () => {
	const exponentMeetingSlot = useSelector(state => state.exponent.exponentMeeting.exponentMeetingSlotList)
	const {t} = useTranslation(); // Переводы

	return(
		<div className={styles.exponentMeetItems}>
			{
				exponentMeetingSlot?.map(item => {
					return(
						<div className={styles.exponentMeetItem}>
							<div className={styles.exponentMeetItemName}>
								<span>{item.time}</span>
							</div>

							<div className={`${styles.exponentMeetItemValue} ${item.status === 'free' ? styles.free : styles.busy}`} >
								<span>{item.status === 'free' ? t("MEETING_FREE") : item.status}</span>
							</div>
						</div>
					)
				})
			}

		</div>
	)
}

export default DistributorExponentMeetItems