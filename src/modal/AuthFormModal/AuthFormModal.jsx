import styles from './AuthFormModal.module.scss'
import {CustomInput, PasswordInput} from "@/utils/ui/index.js";
import {useState} from "react";
import ButtonLoader from "@/utils/ui/ButtonLoader/ButtonLoader.jsx";
import getLastDomainSegment from "@/utils/getLastDomainSegment.js";
import {api} from "@/api/index.js";
import Toast from "@/utils/ui/Toast/Toast.jsx";

const AuthFormModal = () => {

	const [login, setLogin] = useState(null);
	const [password, setPassword] = useState(null);
	const [btnLoad, setBtnLoad] = useState(false);
	const lastSegment = getLastDomainSegment()

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
					<span>Авторизация</span>
				</div>

			<div className={styles.modalItems}>
				<div className={styles.modalItem}>
					<CustomInput title={'Логин'} value={login} onChange={setLogin}/>
				</div>
				<div className={styles.modalItem}>
					<PasswordInput title={'Пароль'} value={password} onChange={setPassword}/>
				</div>
				<div className={styles.modalItem} onClick={formSubmit}>
					<ButtonLoader load={btnLoad} title={'Войти'} style={{width: '100%'}}/>
				</div>
			</div>
		</div>
	)
}

export default AuthFormModal;