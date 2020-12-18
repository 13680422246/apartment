import { RoomState } from './interface';
export const ACTION_SET_PAGINATION = Symbol('分页数据');
export const ACTION_SET_PRICE = Symbol('设置租金');
export const ACTION_SET_AREA = Symbol('设置面积');
export const ACTION_SET_DATA = Symbol('设置数据源');
export const ACTION_SET_DIR = Symbol('设置朝向');

export const Methods: {
	[propsName: string]: (state: RoomState, ...value: any) => RoomState;
} = {
	[ACTION_SET_PAGINATION](state, value) {
		state.pagination = {
			current: value.current || state.pagination.current,
			total: value.total || state.pagination.total,
			pageSize: value.pageSize || state.pagination.pageSize,
		};
		state.hasNextPage = value.hasNextPage;
		return state;
	},
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
	[ACTION_SET_DATA](state, value) {
		state.data = value;
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
