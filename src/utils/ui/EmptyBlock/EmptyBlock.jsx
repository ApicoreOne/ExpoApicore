import infoImg from "../../../images/info.svg";
import styles from './EmptyBlock.module.scss';

const EmptyBlock = ({title, fullWidth, Content, style}) => {
	return (
		<>
			<div className={`${styles.emptyBlock} ${fullWidth ? styles.emptyBlockFull : ''}`} style={{...style}}>
				<div className={styles.emptyBlockTitle}>
					<img src={`${infoImg}`} alt="i"/>

					<span>{title}</span>
				</div>
				{
					Content &&
					<div className={styles.emptyBlockContent}>
						<Content />
					</div>
				}
			</div>
		</>
	)
}

export default EmptyBlock;