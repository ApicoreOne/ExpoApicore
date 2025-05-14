import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import styles from './Banner.module.scss';

import TexpoLogo from '@/images/TexpoBanner.svg?react';

import { useWindowWidth } from "@/hooks/index";
import {useSelector} from "react-redux";

const Banner = () => {
	const bannerRef = useRef(null);
	const windowWidth = useWindowWidth();

	const [vantaEffect, setVantaEffect] = useState(null);
	const [vantaSize, setVantaSize] = useState(null);

	const exponentData = useSelector(state => state.exponent.exponentData);

	// Размер Vanta эффекта, зависит от ширины экрана
	useEffect(() => {
		if (windowWidth <= 480) {
			setVantaSize(6);
		} else if (windowWidth <= 530) {
			setVantaSize(7);
		} else if (windowWidth <= 1440) {
			setVantaSize(7);
		} else if (windowWidth <= 1920) {
			setVantaSize(9);
		} else {
			setVantaSize(9);
		}
	}, [windowWidth]);

	// Инициализация Vanta после того, как DOM готов
	useEffect(() => {
		if (!vantaEffect) {
			import('vanta/dist/vanta.halo.min').then((VANTA) => {
				const effect = VANTA.default({
					el: bannerRef.current,
					THREE,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					baseColor: 0x742edc,
					backgroundColor: 0x131a4,
					amplitudeFactor: 1.5,
					size: vantaSize,
					xOffset: 0,
					yOffset: 0,
					speed: 1.0,
					halo: true,
					glowing: true,
					color: 0x742edc,
				});

				setVantaEffect(effect);
			});
		}

		return () => {
			if (vantaEffect) {
				vantaEffect.destroy();
			}
		};
	}, [vantaEffect, vantaSize]);  // Важное замечание: передаем в зависимости vantaEffect

	return (
		<div ref={bannerRef} className={styles.banner}>
			<div className={styles.bannerImg}>
				<img src={exponentData.logo_black ? exponentData?.logo_black : exponentData?.logo} alt=""/>
			</div>
		</div>
	);
};

export default Banner;
