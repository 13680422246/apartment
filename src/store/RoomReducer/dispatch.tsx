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
export const useTags = (): {
	tag: string;
	value: React.ReactNode;
}[] => {
	const state = useRoomStore();
	const tags = [];
	if (state.price.title !== '租金') {
		tags.push({
			tag: '租金',
			value: state.price.title,
		});
	}
	if (state.area.title !== '面积') {
		tags.push({
			tag: '面积',
			value: state.area.title,
		});
	}
	if (state.dir.title !== '朝向') {
		tags.push({
			tag: '朝向',
			value: state.dir.title,
		});
	}
	return tags;
};
export const useRoomDispatch = () => {
	const dispatch = useDispatch();
	return {
		// 删除标签
		deleteTag(tag: string) {
			if (tag === '租金') {
				this.setPrice({
					title: '不限',
					min: undefined,
					max: undefined,
				});
			} else if (tag === '面积') {
				this.setArea({
					title: '不限',
					min: undefined,
					max: undefined,
				});
			} else if (tag === '朝向') {
				this.setDir('不限');
			}
		},
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
