import {useEffect, useState} from 'react';
import styles from './Header.module.scss';
import Logo from '@/images/ApicoreExpo.svg?react';
import LogoMobile from '@/images/logo_circle.svg?react';
import Account from "@/components/Account/Account.jsx";
import TexpoLogo from "@/images/TexpoBanner.svg?react";

const Header = () => {
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > 50); // меняем состояние при скролле вниз
		};

		window.addEventListener('scroll', handleScroll, {passive: true});

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className={`${styles.header}`}>
			<div className={`${styles.headerContent} ${isSticky ? styles.sticky : ''}`}>
				<div className={styles.headerLogo}>
					<div className={styles.headerLogoDesktop}>
						<Logo/>
					</div>
					<div className={styles.headerLogoMobile}>
						<LogoMobile />
					</div>
				</div>
				<div className={styles.headerLogoExpo}>
					{/*<TexpoLogo />*/}
				</div>
				<div className={styles.headerAccount}>
					<Account/>
				</div>
			</div>
		</div>
	);
};

export default Header;
