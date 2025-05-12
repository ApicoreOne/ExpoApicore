import {useTranslation} from "react-i18next";
import styles from './RegionSelector.module.css';
import {useEffect, useRef, useState} from "react";
import {ReactComponent as GlobalIcon} from "../../img/global.svg";
import {ReactComponent as ArrowIcon} from "../../img/icons/arrow-blue.svg";

const RegionSelector = ({currentRegion, region, burger}) => {
    const {t } = useTranslation();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(region);
    const dropdownRef = useRef(null);

    const countries = [
        {
            id: 'kz',
            name: t('I_KZ'),
            url: 'https://apicore.kz/'
        },
        {
            id: 'uz',
            name: t('I_UZ'),
            url: 'https://apicore.uz/'
        },
        {
            id: 'kg',
            name: t('I_KG'),
            url: 'https://apicore.kg/'
        },
        {
            id: 'one',
            name: 'Global',
            url: 'https://apicore.one/'
        }
    ];

    useEffect(() => {
        setSelectedRegion(region);
    }, [region]);

    const handleToggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleSelectRegion = (id) => {
        setSelectedRegion(id);
        currentRegion(id);
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
    }, [])

    return (
        <div className={`${styles.regionSelector} ${isDropdownOpen ? styles.opened : ''}`} ref={dropdownRef}>
            <div
                className={`${styles.selected} ${isDropdownOpen ? 'open' : ''}`}
                onClick={handleToggleDropdown}
                aria-expanded={isDropdownOpen}
                role="button"
                tabIndex={0}
            >
                <GlobalIcon />
                <span>
                    {currentRegion}
                </span>
                <div className={`${styles.dropdownArrow} dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
                    <ArrowIcon />
                </div>
            </div>

            {isDropdownOpen && (
                <div className={`${styles.regionOptions} language-options`}>
                    {countries
                        .filter((country) => country.name !== currentRegion)
                        .map(({id, name, url}) => (
                        <a
                            href={url}
                            key={id}
                            className="Region-option"
                            onClick={() => handleSelectRegion(id)}
                        >
                            {name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );



};

export default RegionSelector;