import styles from './Wrapper.module.scss'

const Wrapper = ({ children, style, wrapperBackground }) => {
	return (
		<div className={styles.wrapper} style={{...style}}>
			<div className={styles.wrapperBg} style={{background: wrapperBackground}}></div>
			{children}
		</div>
	);
}

export default Wrapper;