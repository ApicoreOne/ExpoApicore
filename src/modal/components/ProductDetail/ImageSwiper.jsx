import React, {useEffect, useRef, useState} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import '../../../styles/swiper.scss'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function ImageSwiper({images}) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	const slideRef = useRef(null);
	const thumbsRef = useRef(null);
	const [slideSize, setSlideSize] = useState(0);
	const [thumbsSize, setThumbsSize] = useState(0);

	useEffect(()=>{
		console.log(thumbsSwiper)
	},[thumbsSwiper])

	// Динамически задаем высоту слайдера в зависимости от ширины окна (главного)
	useEffect(() => {
		const updateSize = () => {
			if (slideRef.current) {
				const width = slideRef.current.offsetWidth;
				setSlideSize(width);
			}
		};

		updateSize();
		window.addEventListener("resize", updateSize);

		return () => {
			window.removeEventListener("resize", updateSize);
		};
	}, []);

	// Динамеский задаем высоту слайдера в зависимости от ширины окна (миниатюр)
	useEffect(() => {
		const updateSize = () => {
			if (thumbsRef.current) {
				const width = thumbsRef.current.offsetWidth;
				setThumbsSize(width);
			}
		};

		updateSize();
		window.addEventListener("resize", updateSize);

		return () => {
			window.removeEventListener("resize", updateSize);
		};
	}, []);

	return (
		<>
			<Swiper
				style={{
					'--swiper-navigation-color': '#fff',
					'--swiper-pagination-color': '#fff',
				}}
				spaceBetween={10}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className="swiperCard"
				loop={true}
			>
				{images.map((image, index) => {
					return(
						<SwiperSlide key={index} ref={slideRef} style={{height: `${slideSize}px`}}>
							<a href={image.path} data-lightbox="img">
								<img src={image.path} alt=""/>
							</a>
						</SwiperSlide>
					)
				})}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				loop={false}
				className="swiperItems"
			>
				{images.map((image, index) => {
					return(
						<SwiperSlide key={index} ref={thumbsRef} style={{height: `${thumbsSize}px`}}>
							<img src={image.path} alt={'img'}/>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</>
	);
}
