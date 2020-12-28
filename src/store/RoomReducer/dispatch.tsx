import React from 'react';
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
// 获取tgas
export const useTags = (): React.ReactNode[] => {
	const state = useRoomStore();
	const tags = [];
	if (state.price.title !== '租金') {
		tags.push(state.price.title);
	}
	if (state.area.title !== '面积') {
		tags.push(state.area.title);
	}
	if (state.dir.title !== '朝向') {
		tags.push(state.dir.title);
	}
	return tags;
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
