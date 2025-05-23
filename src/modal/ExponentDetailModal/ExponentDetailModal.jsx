import styles from "./ExponentDetailModal.module.scss";
import {ScrollBox} from "@/utils/ui/index.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {api} from "@/api/index.js";
import {useTranslation} from "react-i18next";
import InstagramLogo from '@/images/social/instagram.svg?react';
import TelegramLogo from '@/images/social/telegram.svg?react';
import WhatsappLogo from '@/images/social/whatsapp.svg?react';
import YoutubeLogo from '@/images/social/youtube.svg?react';
import EmptyBlock from "@/utils/ui/EmptyBlock/EmptyBlock.jsx";
const ExponentDetailModal = () => {

	const {item} = useSelector(state => state.multiModal.modals[0].modalData)
	const [detail, setDetail] = useState('')
	const {t} = useTranslation()
	const getData = async () => {
		try {
			const response = await api.exponentApi.getExpoExponentsDetail({exponent_id: item.id})
			setDetail(response.exponents)
		} catch (e) {
			console.log(e)
		}
	}

	const socials = [
		{
			name: 'instagram',
			logo: <InstagramLogo/>,
			link: detail.info?.instagram
		},
		{
			name: 'telegram',
			logo: <TelegramLogo/>,
			link: detail.info?.telegram
		},
		{
			name: 'whatsapp',
			logo: <WhatsappLogo/>,
			link: detail.info?.whatsapp
		},
		{
			name: 'youtube',
			logo: <YoutubeLogo/>,
			link: detail.info?.youtube
		}
	]

	useEffect(() => {
		getData()
	}, []);

	return (
		<>
			<div className={styles.modal}>
				<div className={styles.modalTitle}>
					<span>{item?.name}</span>
				</div>

				<ScrollBox style={{display: 'flex', gap: 20, flexDirection: 'column'}}>
					<div className={styles.modalItemLogo}>
						<img src={detail?.logo_link} alt={item?.name}/>
					</div>
					<div className={styles.modalItem}>
						<span>{t("COUNTRY_TITLE")}: {detail.country_name}</span>
					</div>
					<div className={styles.modalItem}>
						<span>{t("CONTACT_PERSON_TITLE")}: {detail.contact}</span>
					</div>
					<div className={styles.modalItem}>
						<span>{t("CONTACT_PHONE_TITLE")}: {detail.phone}</span>
					</div>
					<div className={styles.exponentSocials}>
						{
							socials.map((social, index) => {
								if (!social.link) return null;
								return (
									<div className={styles.exponentSocial} key={index}>
										<a href={social.link} target={"_blank"} onClick={(e) => {
											e.stopPropagation()
										}}>
											{social.logo}
										</a>
									</div>
								)
							})
						}
					</div>
					<div className={styles.modalItem}>
						{
							detail?.info?.text_file_info ? (
								<span>{t("ABOUT_COMPANY_TITLE")}: <br/><br/> <div
									dangerouslySetInnerHTML={{__html: detail?.info?.text_file_info}}></div>
								</span>
							) :
							<span>
								{t("ABOUT_COMPANY_TITLE")}: <EmptyBlock title={t("EMPTY_CONTENT")}/>
							</span>
						}

					</div>
				</ScrollBox>
			</div>
		</>
	)
}

export default ExponentDetailModal