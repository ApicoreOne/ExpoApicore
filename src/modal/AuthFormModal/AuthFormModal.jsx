import styles from './AuthFormModal.module.scss'
import {CustomInput, PasswordInput} from "@/utils/ui/index.js";
import {useState} from "react";
import ButtonLoader from "@/utils/ui/ButtonLoader/ButtonLoader.jsx";
import getLastDomainSegment from "@/utils/getLastDomainSegment.js";
import {api} from "@/api/index.js";
import Toast from "@/utils/ui/Toast/Toast.jsx";
import {useTranslation} from "react-i18next";

const AuthFormModal = () => {

	const [login, setLogin] = useState(null);
	const [password, setPassword] = useState(null);
	const [btnLoad, setBtnLoad] = useState(false);
	const lastSegment = getLastDomainSegment()
	const {t} = useTranslation(); // Переводы

	const formSubmit = async () => {

		setBtnLoad(true)

		const body = {
			login: login,
			password: password
		}

		try{
			const response = await api.authApi.loginUser(body);

			if(response.status === true){
				window.location.href = `${lastSegment === 'd' ? 'http' : 'https'}://cabinet.apicore.kz/`;
			}else{
				Toast(response.message, 'error');
			}
		}catch (e){
			console.log(e)
		}finally {
			setTimeout(() => {
				setBtnLoad(false)
			}, 700)
		}
	}

	return(
		<div className={styles.modal}>
				<div className={styles.modalTitle}>
					<span>{t("AUTHORIZED_TITLE")}</span>
				</div>

			<div className={styles.modalItems}>
				<div className={styles.modalItem}>
					<CustomInput title={t("LOGIN_TITLE")} value={login} onChange={setLogin}/>
				</div>
				<div className={styles.modalItem}>
					<PasswordInput title={t("PASSWORD_TITLE")} value={password} onChange={setPassword}/>
				</div>
				<div className={styles.modalItem} onClick={formSubmit}>
					<ButtonLoader load={btnLoad} title={t("ENTER_TITLE")} style={{width: '100%'}}/>
				</div>
			</div>
		</div>
	)
}

export default AuthFormModal;