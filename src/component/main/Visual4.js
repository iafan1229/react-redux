import React from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Common from '../common/Common';
import Popup from '../common/Popup';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, EffectFade } from 'swiper';

function Visual4() {
	const youtubeData = useSelector((store) => store.youtubeReducer.youtube);
	const [index, setIndex] = useState(0);
	const pop = useRef(null);
	return (
		<>
			<Common name={'vis4'}>
				<div className='show-video'>
					<h2>HOT 5 playlist!</h2>
					<ul className='youtube'>
						{youtubeData.map((youtube, idx) => {
							if (idx < 5)
								return (
									<li
										className='list'
										onClick={() => {
											setIndex(idx);
											pop.current.show();
										}}>
										<img src={youtube.snippet.thumbnails.medium.url} alt='' />
										{/* <p>{youtube.snippet.title}</p>   */}
									</li>
								);
						})}
					</ul>
					<h2>Playlist Details</h2>
					<Swiper
						spaceBetween={30}
						effect={'fade'}
						navigation={true}
						pagination={{
							clickable: true,
						}}
						modules={[EffectFade, Navigation, Pagination]}
						fadeEffect={{ crossFade: true }}
						className='mySwiper'>
						{youtubeData.map((youtube, idx) => {
							const des = youtube.snippet.description;
							if (idx < 5)
								return (
									<SwiperSlide>
										<div className='swiper-img'>
											<img
												src={youtube.snippet.thumbnails.medium.url}
												onClick={() => {
													setIndex(idx);
													pop.current.show();
												}}
												alt=''
											/>
										</div>
										<div class='swiper-wrap'>
											<div class='slide-content'>
												<div class='slide-content-inner'>
													<h2>{youtube.snippet.title}</h2>
													<h3>{youtube.snippet.publishedAt.split('T')[0]}</h3>
													<p>{des.length > 150 ? des.substr(0, 150) : des}</p>
												</div>
											</div>
										</div>
										{/* <p>{youtube.snippet.title}</p>   */}
									</SwiperSlide>
								);
						})}
					</Swiper>
				</div>
			</Common>
			<Popup ref={pop}>
				{youtubeData.length !== 0 && (
					<>
						<iframe
							src={`https://www.youtube.com/embed/${youtubeData[index].id}`}
							frameBorder='0'
							allowFullScreen
						/>
						<button onClick={() => pop.current.unshow()}>CLOSE</button>
					</>
				)}
			</Popup>
		</>
	);
}

export default Visual4;
