import styles from './Header.module.scss';
import Logo from '@/images/ApicoreExpo.svg?react';
import LogoMobile from '@/images/logo_circle.svg?react';
import Account from "@/components/Account/Account.jsx";
import {Wrapper} from "@/utils/ui/index.js";
import {useSelector} from "react-redux";
import {ReactSVG} from "react-svg";

const Header = () => {

	const expoData = useSelector(state => state.exponent.exponentData);

	return (
		<div className={`${styles.header}`}>
			<div className={`${styles.headerContent} ${styles.sticky}`}>
				<Wrapper style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
					<div className={styles.headerLogo}>
						<div className={styles.headerLogoDesktop}>
							<a href="/">
								<Logo/>
							</a>
						</div>
						<div className={styles.headerLogoMobile}>
							<LogoMobile/>
						</div>
					</div>
					{
						expoData?.logo && (
							<div className={styles.headerLogoExpo}>
								<img src={expoData.logo} alt=""/>
							</div>
						)
					}
					<div className={styles.headerAccount}>
						<Account/>
					</div>
				</Wrapper>
			</div>
		</div>
	);
};

export default Header;
