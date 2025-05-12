import styles from './Header.module.scss';
import Logo from '@/images/ApicoreExpo.svg?react';
import LogoMobile from '@/images/logo_circle.svg?react';
import Account from "@/components/Account/Account.jsx";
import {Wrapper, TabWrapper} from "@/utils/ui/index.js";
import {useSelector} from "react-redux";
import LanguageSelector from "@/components/LanguageSelector/LanguageSelector.jsx";
import {useEffect, useState} from "react";
import getLastDomainSegment from "@/utils/getLastDomainSegment.js";
import useLocalStorage from "@/hooks/useLocalStorage.jsx";
import i18n from "@/i18n";
import {useTranslation} from "react-i18next";

const Header = () => {
	const lastSegment = getLastDomainSegment()
	const {t} = useTranslation(); // Переводы
	const [language, setLanguage] = useLocalStorage('language', lastSegment === 'one' ? 'en' : 'ru'); // Локальное хранилище для языка
	const expoData = useSelector(state => state.exponent.exponentData);


	useEffect(() => {
		i18n.changeLanguage(language); // Изменение языка при загрузке
	}, []);

	// Установка текущего языка и перезагрузка страницы
	const setCurrentLanguage = (el) => {
		i18n.changeLanguage(el);
		setLanguage(el);
		window.location.reload();
	}

	return (
		<div className={`${styles.header}`}>
			<div className={`${styles.headerContent} ${styles.sticky}`}>
				<Wrapper style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '0 50px'
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
					<TabWrapper>
						<div className='i_change_language'>
							<LanguageSelector setCurrentLanguage={setCurrentLanguage} language={language}/>
						</div>
						<div className={styles.headerAccount}>
							<Account/>
						</div>
					</TabWrapper>
				</Wrapper>
			</div>
		</div>
	);
};

export default Header;
