import styles from './ScrollBox.module.scss'

const ScrollBox = ({ children, height = '100%', width = '100%', style }) => {
	return (
		<div className={styles.scrollBox} style={{ height, width, ...style }} id={'scrollBox'}>
			{children}
		</div>
	);
};

export default ScrollBox;