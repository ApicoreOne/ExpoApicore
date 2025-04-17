import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import styles from './Banner.module.scss';

import TexpoLogo from '@/images/TexpoBanner.svg?react';

import {useWindowWidth} from "@/hooks/index";

const Banner = () => {
	const bannerRef = useRef(null);
	const windowWidth = useWindowWidth();

	const [vantaEffect, setVantaEffect] = useState(null);
	const [vantaSize, setVantaSize] = useState(null);

	useEffect(() => {
		if (windowWidth <= 480) {
			setVantaSize(6); // для самых маленьких экранов
		} else if (windowWidth <= 530) {
			setVantaSize(7); // для планшетов
		} else if (windowWidth <= 1440) {
			setVantaSize(7); // для больших экранов
		}else if (windowWidth <= 1920) {
			setVantaSize(9); // для экранов 2K
		}else{
			setVantaSize(9); // для экранов 4K
		}
	}, [windowWidth]);


	useEffect(() => {
		if (!vantaEffect) {
			import('vanta/dist/vanta.halo.min').then((VANTA) => {
				setVantaEffect(
					VANTA.default({
						el: bannerRef.current,
						THREE,
						mouseControls: true,
						touchControls: true,
						gyroControls: false,
						baseColor: 0x742edc, // Фиолетовый цвет свечения
						backgroundColor: 0x131a4, // Чёрный фон
						amplitudeFactor: 1.5,
						size: vantaSize, // Увеличиваем размер шара
						xOffset: 0,
						yOffset: 0,
						speed: 1.0,
						halo: true, // Добавляем эффект свечения
						glowing: true, // Включаем свечение
						color: 0x742edc, // Цвет свечения (фиолетовый)
					})
				);
			});
		}

		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect, vantaSize]);

	return (
		<div ref={bannerRef} className={styles.banner}>
			<div className={styles.bannerImg}>
				<TexpoLogo />
			</div>
		</div>
	);
};

export default Banner;
