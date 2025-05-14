import {useDispatch, useSelector} from "react-redux";
import styles from './Account.module.scss'
import AvatarSvg from '@/images/avatar.svg?react'
import getLastDomainSegment from "@/utils/getLastDomainSegment.js";
import {useTranslation} from "react-i18next";

const Account = () => {
	const authorized = useSelector(state => state.userData.authorization);
	const lastSegment = getLastDomainSegment()
	const dispatch = useDispatch();

	const {t} = useTranslation(); // Переводы


	return (
		<>
			{
				authorized
					?
					<div className={styles.headerAccount}>
						<a href={`${lastSegment === 'd' ? 'http' : 'https'}://cabinet.apicore.kz`}
						   className={styles.cabinetButton}>
							<AvatarSvg/>
							<span>{t("CABINET_TITLE")}</span>
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
							<span>{t("CABINET_TITLE")}</span>
						</div>
					</div>
			}
		</>
	)
}

export default Account;