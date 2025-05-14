import { useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { api } from "@/api/index";
import preloaderImg from "@/images/tools/tube-spinner.svg";
import styles from "./ExpoRegisterUser.module.scss";
import {useTranslation} from "react-i18next";


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
				<div className={styles.formItem}>
					<label>{t("FIO_TITLE")}</label>
					<input
						type="text"
						name="USER_NAME"
						maxLength="50"
						size="17"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className={styles.formItem}>
					<label>{t("COMPANY_TITLE")}</label>
					<input
						type="text"
						name="USER_COMPANY"
						maxLength="50"
						size="17"
						value={company}
						onChange={(e) => setCompany(e.target.value)}
					/>
				</div>

				<div className={styles.formItem}>
					<label>{t("PHONE_TITLE")}</label>
					<input
						type="text"
						name="USER_PHONE"
						maxLength="50"
						size="17"
						value={phone}
						onChange={(e) => {
							const value = e.target.value;
							const filteredValue = value.replace(/[^+\d]/g, "");
							setPhone(filteredValue);
						}}
					/>
				</div>

				<div className={styles.formItem}>
					<label>{t("EMAIL_TITLE")}</label>
					<input
						type="text"
						name="USER_EMAIL"
						maxLength="50"
						size="17"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
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
