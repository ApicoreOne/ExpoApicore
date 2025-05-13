import styles from './ExponentQrCode.module.scss'
import {useDispatch} from "react-redux";
import QrCode from '@/images/tools/qr-code.svg?react';

const ExponentQrCode = ({item}) => {

	const dispatch = useDispatch();

	const openQRModal = (e, item) => {
		e.stopPropagation();
		dispatch({type: "OPEN_MODAL", modalType: 'qrModal', modalLevel : 1, modalData: {item: item}});
	}

	return(
		<div className={styles.exponentQrCode} onClick={(e) => {
			openQRModal(e, item)
		}}>
			<QrCode />
		</div>
	)
}

export default ExponentQrCode;