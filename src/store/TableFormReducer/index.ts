import { TableFormInterface } from './interface';
import { CommonFuncHnalder } from '..';
import { Methods } from './ActionTypes';

const defaultState: TableFormInterface = {
	data: [], // 数据源
	// 分页数据
	pagination: {
		current: 1,
		total: 0,
		pageSize: 10,
	},
	// 筛选数据
	filteredInfo: {},
	// 排序数据
	sortedInfo: {},
	editingKey: '', // 正在编辑的item.id
	// 搜索
	searchText: '', // 搜索文本
	searchedColumn: '', // 搜索列
	// form表单对象
	form: null,
	select: null,
};
export default CommonFuncHnalder<TableFormInterface>(defaultState, Methods);
