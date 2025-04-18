import styles from './ButtonLoader.module.scss'
import {useEffect, useState} from "react";

const ButtonLoader = ({ load, title, onClick, disabled, href, style }) => {

	const [buttonDisabled, setButtonDisabled] = useState(false)

	useEffect(() => {
		setButtonDisabled(disabled)
	}, [disabled]);

	return (
		<>
			{href ? (
				<a className={`${styles.buttonLoader} ${load ? `${styles.loader}` : ''} ${buttonDisabled ? `${styles.disabled}` : ''}`} href={href} style={{...style}}>
					<span>{title}</span>
				</a>
			) : (
				<button className={`${styles.buttonLoader} ${load ? `${styles.loader}` : ''} ${buttonDisabled ? `${styles.disabled}` : ''}`} onClick={onClick} disabled={buttonDisabled} style={{...style}}>
					<span>{title}</span>
				</button>
			)}
		</>
	);
};

export default ButtonLoader;