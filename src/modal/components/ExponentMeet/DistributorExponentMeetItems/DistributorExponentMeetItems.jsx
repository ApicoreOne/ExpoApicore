import styles from './DistributorExponentMeetItems.module.scss'
import {useSelector} from "react-redux";

const DistributorExponentMeetItems = () => {
	const exponentMeetingSlot = useSelector(state => state.exponent.exponentMeeting.exponentMeetingSlotList)

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
								<span>{item.status === 'free' ? 'Свободен' : item.status}</span>
							</div>
						</div>
					)
				})
			}

		</div>
	)
}

export default DistributorExponentMeetItems