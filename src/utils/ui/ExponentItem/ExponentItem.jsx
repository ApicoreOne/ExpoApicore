import styles from './ExponentItem.module.scss'

import InstagramLogo from '@/images/social/instagram.svg?react';
import TelegramLogo from '@/images/social/telegram.svg?react';
import WhatsappLogo from '@/images/social/whatsapp.svg?react';
import YoutubeLogo from '@/images/social/youtube.svg?react';
import {ExponentMeet, ExponentQrCode, ExponentShowCatalog} from "@/utils/ui/";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";

const ExponentItem = ({item}) => {

	const dispatch = useDispatch();

	const authorized = useSelector(state => state.userData.authorization);
	const ExpoIDUser = Cookies.get('expo_user_id');

	const socials = [
		{
			name: 'instagram',
			logo: <InstagramLogo/>,
			link: item.info?.instagram
		},
		{
			name: 'telegram',
			logo: <TelegramLogo/>,
			link: item.info?.telegram
		},
		{
			name: 'whatsapp',
			logo: <WhatsappLogo/>,
			link: item.info?.whatsapp
		},
		{
			name: 'youtube',
			logo: <YoutubeLogo/>,
			link: item.info?.youtube
		}
	]

	function openDetailExponentModal(){
		dispatch({type:"OPEN_MODAL", modalLevel: 1, modalType: 'exponentDetailModal', modalData:{item: item}});
	}

	return(
		<div className={styles.exponentItem} onClick={openDetailExponentModal}>
			<div className={styles.exponentItemImg}>
				<img src={item.logo_link} alt={item.name}/>
			</div>

			<div className={styles.exponentName}>
				<span>{item.name}</span>
			</div>

			<div className={styles.exponentType}>
				<span>{item.contact}</span>
				{(ExpoIDUser || authorized) && <a href={`tel:+${item.phone}`} onClick={(e)=>{e.stopPropagation()}}>{item.phone}</a>}
			</div>

			<div className={styles.exponentSocials}>
				{
					socials.map((social, index) => {
						if (!social.link) return null;
						return (
							<div className={styles.exponentSocial} key={index}>
								<a href={social.link} target={"_blank"} onClick={(e)=>{e.stopPropagation()}}>
									{social.logo}
								</a>
							</div>
						)
					})
				}
			</div>

			<div className={styles.exponentCatalogs}>
				{
					item?.catalog?.qr && (
						<>
							<ExponentQrCode item={item} />
							<ExponentShowCatalog item={item} />
						</>
					)
				}
			</div>

			<ExponentMeet item={item}/>
		</div>
	)
}

export default ExponentItem;