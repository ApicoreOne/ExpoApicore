import {useSelector} from "react-redux";
import styles from './HeaderMonthPicker.module.scss'

const HeaderMonthPicker = () => {
	const headerMonths = useSelector(state => state.app.headerMonths)

	return(
		<div className={styles.headerMonthPicker}>
			{headerMonths.length > 0 && headerMonths.map((item, index) => {
				return(
					<div className={`${styles.headerMonthPickerItem} ${item.active ? styles.active : ''}`} key={index}>
						<span>{item.title}</span>
					</div>
				)
			})}
		</div>
	)
}

export default HeaderMonthPicker;