import styles from './ExponentItem.module.scss'
import exponentTest from '@/images/exponentTest.png'

import InstagramLogo from '@/images/social/instagram.svg?react';
import TelegramLogo from '@/images/social/telegram.svg?react';
import WhatsappLogo from '@/images/social/whatsapp.svg?react';
import YoutubeLogo from '@/images/social/youtube.svg?react';
import ExponentQrCode from "@/utils/ui/ExponentQrCode/ExponentQrCode.jsx";

const ExponentItem = ({item, key}) => {

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

	return(
		<div className={styles.exponentItem} key={key}>
			<div className={styles.exponentItemImg}>
				<img src={exponentTest} alt="test"/>
			</div>

			<div className={styles.exponentName}>
				<span>{item.name}</span>
			</div>

			<div className={styles.exponentType}>
				<span>Lorem ipsum dolor sit amet.</span>
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
						<ExponentQrCode item={item} />
					)
				}
			</div>

		</div>
	)
}

export default ExponentItem;