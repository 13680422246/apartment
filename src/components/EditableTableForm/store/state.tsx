import { TablePaginationConfig } from 'antd/lib/table';

export interface IPagination {
	current: number;
	total: number;
	pageSize: number;
}
export interface ITableForm {
	loading: boolean; // 是否加载中
	data: any[]; // 数据源
	pagination: IPagination; // 分页数据
	editingKey: string; // 当前编辑的item.id
	searchText: string; // 搜索文本
	searchedColumn: string; // 搜索列
	filteredInfo: TablePaginationConfig; // 筛选对象
	sortedInfo: any; // 排序对象
}
export const defaultState: ITableForm = {
	loading: false,
	data: [],
	pagination: {
		current: 0,
		pageSize: 10,
		total: 0,
	},
	editingKey: '',
	searchText: '',
	searchedColumn: '',
	filteredInfo: {},
	sortedInfo: {},
};
