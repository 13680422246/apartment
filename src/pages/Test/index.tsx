import React, { memo, useCallback, useRef } from 'react';
// import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

interface IPros {}
const defaultProps = {};
interface IFriend {
	name: string;
}
const Index: React.FC<IPros> = (props) => {
	const ref = useRef<IFriend>();
	const handleClick = useCallback(() => {
		ref.current = {
			name: 'asdqwe',
		};
	}, []);

	return (
		<>
			<Swiper
				onClick={handleClick}
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
Index.defaultProps = defaultProps;
export default memo(Index);
