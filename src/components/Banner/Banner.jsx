import BannerTest from '@/images/banner_test.jpg'
import styles from './Banner.module.scss'

const Banner = () => {
	return(
		<div className={styles.banner}>
			<div className={styles.bannerImg}>
				<img src={`${BannerTest}`} alt=""/>
			</div>
		</div>
	)
}

export default Banner