import styles from './ExponentItem.module.scss'

import InstagramLogo from '@/images/social/instagram.svg?react';
import TelegramLogo from '@/images/social/telegram.svg?react';
import WhatsappLogo from '@/images/social/whatsapp.svg?react';
import YoutubeLogo from '@/images/social/youtube.svg?react';
import {ExponentQrCode, ExponentShowCatalog} from "@/utils/ui/";

const ExponentItem = ({item}) => {

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

	console.log(item)

	return(
		<div className={styles.exponentItem}>
			<div className={styles.exponentItemImg}>
				<img src={item.logo_link} alt={item.name}/>
			</div>

			<div className={styles.exponentName}>
				<span>{item.name}</span>
			</div>

			<div className={styles.exponentType}>
				<span>{item.contact}</span>
				{/*<a href={`tel:+${item.phone}`}>{item.phone}</a>*/}
			</div>

			<div className={styles.exponentSocials}>
				{
					socials.map((social, index) => {
						if (!social.link) return null;
						return (
							<div className={styles.exponentSocial} key={index}>
								<a href={social.link} target={"_blank"}>
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

		</div>
	)
}

export default ExponentItem;