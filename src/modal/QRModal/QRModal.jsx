import {useSelector} from "react-redux";
import styles from './QRModal.module.scss'

const QRModal = () => {
	const modals = useSelector(state => state.multiModal.modals[0])
	const qrCode = modals.modalData.item.catalog.qr;
	const name = modals.modalData.item.name;

	return(
		<div className={styles.qrModal}>
			<div className={styles.qrModalTitle}>
				<span>{name}</span>
			</div>
			<div className={styles.qrModalContainer}>
				<img src={qrCode} alt="qrcode"/>
			</div>
		</div>
	)
}

export default QRModal;