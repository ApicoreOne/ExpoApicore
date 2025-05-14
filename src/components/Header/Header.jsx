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
import {useWindowWidth} from "@/hooks/index.js";
import HeaderMonthPicker from "@/utils/ui/HeaderMonthPicker/HeaderMonthPicker.jsx";
import {Link, useHref} from "react-router-dom";

const Header = () => {
	const [showHeaderMonths, setShowHeaderMonths] = useState(false); // Состояние для отображения месяцев в заголовке

	const {t} = useTranslation(); // Переводы
	const lastSegment = getLastDomainSegment()
	const [language, setLanguage] = useLocalStorage('language', lastSegment === 'one' ? 'en' : 'ru'); // Локальное хранилище для языка
	const windowWidth = useWindowWidth()
	const url = useHref();

	const expoData = useSelector(state => state.exponent.exponentData);
	const headerMonths = useSelector(state => state.app.headerMonths)

	useEffect(() => {
		i18n.changeLanguage(language); // Изменение языка при загрузке
	}, []);

	useEffect(()=>{
		console.log(headerMonths)
		if (url === '/' && headerMonths?.length > 0) {
			setShowHeaderMonths(true);
		}else{
			setShowHeaderMonths(false);
		}
	},[url, headerMonths])

	// Установка текущего языка и перезагрузка страницы
	const setCurrentLanguage = (el) => {
		i18n.changeLanguage(el);
		setLanguage(el);
		window.location.reload();
	}

	return (
		<div className={`${styles.header} ${showHeaderMonths ? styles.withBottom : ''}`}>
			<div className={`${styles.headerContent} ${styles.sticky}`}>
				<div className={styles.headerTop}>
					<Wrapper style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: windowWidth > 1920 ? '0 50px' : '0',
					}}>
						<div className={styles.headerLogo}>
							<div className={styles.headerLogoDesktop}>
								<Link to="/">
									<Logo/>
								</Link>
							</div>
							<div className={styles.headerLogoMobile}>
								<Link to="/">
									<LogoMobile/>
								</Link>
							</div>
						</div>
						{
							url !== '/' && expoData?.logo && (
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
				{
					showHeaderMonths && (
						<div className={styles.headerBottom}>
							<Wrapper style={{padding: windowWidth > 1920 ? '0 50px' : '0'}}>
								<HeaderMonthPicker/>
							</Wrapper>
						</div>
					)
				}
			</div>
		</div>
	);
};

export default Header;
