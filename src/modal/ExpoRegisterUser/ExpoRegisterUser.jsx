import { useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { api } from "@/api/index";
import preloaderImg from "@/images/tools/tube-spinner.svg";
import styles from "./ExpoRegisterUser.module.scss";
import {useTranslation} from "react-i18next";
import {CustomInput} from "@/utils/ui/index.js";


const ExpoRegisterUser = () => {
	const [name, setName] = useState("");
	const [company, setCompany] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [btnLoad, setBtnLoad] = useState(false);
	const [error, setError] = useState("");

	const catalogHash = useSelector((state) => state.multiModal.modals[0].modalData.hash);
	const {t} = useTranslation()

	const sendRegisterUser = async () => {
		setBtnLoad(true);

		const response = await api.exponentApi.saveContact({
			name,
			company,
			phone,
			email,
		});

		if (response.status === true) {
			Cookies.set("expo_user_id", response.id, { expires: 365 });
			const newUrl = new URL(window.location);
			newUrl.searchParams.set("catalog", catalogHash);
			window.history.pushState({}, "", newUrl);
			window.location.reload()
		} else {
			setError(response.message);
		}

		setBtnLoad(false);
	};

	return (
		<div className={styles.texpoRegister}>
			<div className={styles.modalTitle}>
				<span>{t("CONTACTS_INFO_TITLE")}</span>
			</div>
			<div className={styles.modalSubtitle}>
        <span>
          {t("CONTACTS_INFO_SUBTITLE")}
        </span>
			</div>

			<div className={styles.items}>
				<CustomInput title={t("FIO_TITLE")} onChange={setName} required={true}/>
				<CustomInput title={t("COMPANY_TITLE")} onChange={setCompany} required={true}/>
				<CustomInput title={t("PHONE_TITLE")} onChange={setPhone} type={"number"} value={phone}/>
				<CustomInput title={t("EMAIL_TITLE")} onChange={setEmail} required={true}/>
			</div>

			<div className={styles.formError}>
				<span dangerouslySetInnerHTML={{ __html: error }} />
			</div>

			<div className={styles.buttonWrapper}>
				<div className={`${styles.formItem} ${btnLoad ? styles.load : ""}`}>
					<div className={styles.preloader}>
						<img src={preloaderImg} alt="" />
					</div>
					<button className={styles.authBtn} onClick={sendRegisterUser}>
						<span>{t("SEND_BTN_TITLE")}</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ExpoRegisterUser;
