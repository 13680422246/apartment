import { Methods } from './ActionTypes';
import { CommonFuncHnalder } from '..';
import { RoomState } from './interface';

const defaultState: RoomState = {
	data: [], // 数据源
	// 分页数据
	pagination: {
		current: 1,
		total: 0,
		pageSize: 20,
	},
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
	// hasmore
	hasNextPage: true,
	// 搜索内容
	searchText: '',
};

export default CommonFuncHnalder<RoomState>(defaultState, Methods);
