import { useSelector } from "react-redux";
import styles from './HeaderMonthPicker.module.scss';
import { useState, useEffect } from "react";

const HeaderMonthPicker = () => {
	const headerMonths = useSelector(state => state.app.headerMonths) || [];
	const [activeMonths, setActiveMonths] = useState(null);

	useEffect(() => {
		if (headerMonths.length > 0) {
			const activeMonth = headerMonths.find(item => item.active)?.code || null;
			setActiveMonths(activeMonth);

			document.querySelector(`#expo-focus`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [headerMonths]);

	function handleChangeActiveMonths(code) {
		setActiveMonths(code);

		document.querySelector(`[data-code=${code}]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	return (
		<div className={styles.headerMonthPicker}>
			{headerMonths?.map((item) => (
				<div
					key={item.code}
					className={`${styles.headerMonthPickerItem} ${item.code === activeMonths ? styles.active : ''}`}
					onClick={() => handleChangeActiveMonths(item.code)}
				>
					<span>{item.title}</span>
				</div>
			))}
		</div>
	);
}

export default HeaderMonthPicker;
