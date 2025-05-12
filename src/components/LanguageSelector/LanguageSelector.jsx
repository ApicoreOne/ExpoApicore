import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LangIcon from '@/images/icons/lang-icon-1.svg?react';
import BurgerArrow  from '@/images/burger-language-arrow.svg?react';
import styles from './LanguageSelector.module.scss';

const LanguageSelector = ({ setCurrentLanguage, language }) => {
	const { t } = useTranslation();
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState(language);
	const dropdownRef = useRef(null);

	useEffect(() => {
		setSelectedLanguage(language);
	}, [language]);

	const languageOptions = [
		{ value: 'en', label: 'En' },
		{ value: 'ru', label: 'Ру' },
		{ value: 'uz', label: 'Uz' },
		{ value: 'cn', label: '中文' },
	];

	const handleToggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	const handleSelectLanguage = (value) => {
		setSelectedLanguage(value);
		setCurrentLanguage(value);
		setDropdownOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.customLanguageSelector} ref={dropdownRef}>
			<div
				className={`${styles.selectedLanguage} ${isDropdownOpen ? styles.open : ''}`}
				onClick={handleToggleDropdown}
				aria-expanded={isDropdownOpen}
				role="button"
				tabIndex={0}
			>
				<LangIcon />
				{t(languageOptions.find((option) => option.value === selectedLanguage)?.label)}
				<div className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.open : ''}`}>
					<BurgerArrow />
				</div>
			</div>

			{isDropdownOpen && (
				<div className={styles.languageOptions}>
					{languageOptions
						.filter((option) => option.value !== selectedLanguage)
						.map((option) => (
							<div
								key={option.value}
								className={styles.languageOption}
								onClick={() => handleSelectLanguage(option.value)}
							>
								{t(option.label)}
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default LanguageSelector;
