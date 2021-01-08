import React, { memo } from 'react';
// import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

interface IPros {}
const defaultProps = {};
const index: React.FC<IPros> = (props) => {
	// const time = moment(new Date().toString()).format('YYYY-mm-dd');
	return (
		<>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
			</Swiper>
		</>
	);
};
index.defaultProps = defaultProps;
export default memo(index);
