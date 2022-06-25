import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper';

import Common from '../common/Common';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

function Visual1() {
	const path = process.env.PUBLIC_URL;
	const [num, setNum] = useState(3);
	const initSlide = () => {
		if (window.innerWidth < 768) {
			setNum(2);
		} else if (window.innerWidth < 400) {
			setNum(1);
		} else {
			setNum(3);
		}
	};
	useEffect(() => {
		initSlide();
		window.addEventListener('resize', initSlide);
		return () => window.removeEventListener('resize', initSlide);
	}, []);
	return (
		<Common name={'vis1'}>
			<h2>Video List</h2>
			<Swiper
				className='swiper'
				modules={[Navigation, Pagination, EffectCoverflow]}
				loop={true}
				spaceBetween={50}
				slidesPerView={num}
				navigation
				pagination={{ clickable: true }}
				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				coverflowEffect={{
					rotate: 20,
					stretch: 80,
					depth: 200,
					modifier: 1,
					slideShadows: false,
				}}
				onSlideChange={(e) => {
					e.slides.forEach((el, idx) => {
						el.childNodes[0].pause();
					});
					const active = e.slides.filter((el, idx) => {
						return idx === e.activeIndex;
					});
					active[0].childNodes[0].play();
				}}>
				{[1, 2, 3, 4].map((num) => {
					return (
						<SwiperSlide className='slide'>
							<video
								src={path + '/img/vid' + num + '.mp4'}
								loop
								muted
								autoPlay={false}></video>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Common>
	);
}

export default Visual1;
