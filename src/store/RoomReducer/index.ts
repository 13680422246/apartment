import { Methods } from './ActionTypes';
import { CommonFuncHnalder } from '..';
import { RoomState } from './interface';

const defaultState: RoomState = {
	// 租金数据
	price: {
		title: '租金',
		min: undefined,
		max: undefined,
	},
	// 面积数据
	area: {
		title: '面积',
		min: undefined,
		max: undefined,
	},
	// 朝向
	dir: {
		title: '朝向',
		content: '',
	},
};

export default CommonFuncHnalder<RoomState>(defaultState, Methods);
