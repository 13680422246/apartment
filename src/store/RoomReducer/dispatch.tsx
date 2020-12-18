import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '..';
import {
	ACTION_SET_PRICE,
	ACTION_SET_AREA,
	ACTION_SET_DIR,
} from './ActionTypes';
import { Filter } from './interface';

export const useRoomStore = () => {
	return useSelector((store: IStore) => store.room);
};
export const useRoomDispatch = () => {
	const dispatch = useDispatch();
	return {
		// 设置租金
		setPrice(value: Filter) {
			dispatch({
				type: ACTION_SET_PRICE,
				args: [value],
			});
		},
		// 设置面积
		setArea(value: Filter) {
			dispatch({
				type: ACTION_SET_AREA,
				args: [value],
			});
		},
		// 设置朝向
		setDir(value: string) {
			dispatch({
				type: ACTION_SET_DIR,
				args: [value],
			});
		},
	};
};
