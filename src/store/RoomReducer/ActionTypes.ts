import { RoomState } from './interface';
export const ACTION_SET_PRICE = Symbol('设置租金');
export const ACTION_SET_AREA = Symbol('设置面积');
export const ACTION_SET_DIR = Symbol('设置朝向');

export const Methods: {
	[propsName: string]: (state: RoomState, ...value: any) => RoomState;
} = {
	[ACTION_SET_PRICE](state, value) {
		let { title, min, max } = value;
		if (!title || title === '不限') title = '租金';
		state.price = {
			title,
			min,
			max,
		};
		return state;
	},
	[ACTION_SET_AREA](state, value) {
		let { title, min, max } = value;
		if (!title || title === '不限') title = '面积';
		state.area = {
			title,
			min,
			max,
		};
		return state;
	},
	[ACTION_SET_DIR](state, value) {
		let title = value;
		let content = value;
		if (title === '不限') {
			title = '朝向';
			content = '';
		}
		state.dir = {
			title,
			content,
		};
		return state;
	},
};
