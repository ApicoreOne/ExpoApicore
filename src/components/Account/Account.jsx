import {useDispatch, useSelector} from "react-redux";
import styles from './Account.module.scss'
import AvatarSvg from '@/images/avatar.svg?react'
import getLastDomainSegment from "@/utils/getLastDomainSegment.js";

const Account = () => {
	const authorized = useSelector(state => state.userData.authorization);
	const lastSegment = getLastDomainSegment()
	const currentDomain = window.location.hostname;
	const dispatch = useDispatch();

	return (
		<>
			{
				authorized
					?
					<div className={styles.headerAccount}>
						<a href={`${lastSegment === 'd' ? 'http' : 'https'}://cabinet.apicore.one}`}
						   className={styles.cabinetButton}>
							<AvatarSvg/>
							<span>Кабинет</span>
						</a>
					</div>
					:
					<div className={styles.headerAccount}>
						<div className={styles.cabinetButton} onClick={() => {
							dispatch({
								type: "OPEN_MODAL",
								modalLevel: 1,
								modalType: 'authFormModal'
							})
						}}>
							<AvatarSvg/>
							<span>Кабинет</span>
						</div>
					</div>
			}
		</>
	)
}

export default Account;