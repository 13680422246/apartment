import { TableFormInterface } from './interface';
export const ACTION_SET_PAGINATION = Symbol('分页数据');
export const ACTION_SET_FILTERS_AND_SORTER = Symbol('设置筛选数据和排序数据');
export const ACTION_SET_DATA = Symbol('数据源');
export const ACTION_SET_EDITINGKEY = Symbol('editingKey');
export const ACTION_SET_FORM = Symbol('form表单对象');
export const ACTION_SET_SEARCH_TEXT = Symbol('搜索文本');
export const ACTION_SET_SEARCH_COLUMN = Symbol('搜索列');
export const ACTION_SET_SELECT = Symbol('输入框的select函数');
export const ACTION_SET_RESET = Symbol('reset');

export const Methods: {
	[propsName: string]: (
		state: TableFormInterface,
		...value: any
	) => TableFormInterface;
} = {
	[ACTION_SET_PAGINATION](state, value) {
		state.pagination = {
			current: value.current || state.pagination.current,
			total: value.total || state.pagination.total,
			pageSize: value.pageSize || state.pagination.pageSize,
		};
		return state;
	},
	[ACTION_SET_FILTERS_AND_SORTER](state, filters, sorter) {
		state.filteredInfo = filters || state.filteredInfo;
		state.sortedInfo = sorter || state.sortedInfo;
		return state;
	},
	// 设置数据源
	[ACTION_SET_DATA](state, value) {
		state.data = value;
		return state;
	},
	[ACTION_SET_EDITINGKEY](state, value) {
		state.editingKey = value;
		return state;
	},
	[ACTION_SET_FORM](state, value) {
		state.form = value;
		return state;
	},
	[ACTION_SET_SEARCH_TEXT](state, value) {
		state.searchText = value;
		return state;
	},
	[ACTION_SET_SEARCH_COLUMN](state, value) {
		state.searchedColumn = value;
		return state;
	},
	[ACTION_SET_SELECT](state, value) {
		state.select = value;
		return state;
	},
	[ACTION_SET_RESET](state, value) {
		state.data = []; // 数据源
		// 分页数据
		state.pagination = {
			current: 1,
			total: 0,
			pageSize: value || state.pagination.pageSize,
		};
		state.editingKey = ''; // 编辑item.id
		state.searchText = ''; // 选择文本
		state.searchedColumn = ''; // 选择列
		state.select = null; // 选择事件
		state.filteredInfo = {}; // 筛选数据
		state.sortedInfo = {}; // 排序数据
		return state;
	},
};
