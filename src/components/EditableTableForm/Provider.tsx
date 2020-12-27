import { TablePaginationConfig } from 'antd/lib/table';
import React, { createContext, useReducer } from 'react';

interface IPagination {
	current: number;
	total: number;
	pageSize: number;
}
interface ITableForm {
	data: any[]; // 数据源
	pagination: IPagination; // 分页数据
	editingKey: string; // 当前编辑的item.id
	searchText: string; // 搜索文本
	searchedColumn: string; // 搜索列
	filteredInfo: TablePaginationConfig; // 筛选对象
	sortedInfo: any; // 排序对象
}

// state
const defualtState: ITableForm = {
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

// reducer
export type DispatchType = {
	type: string;
	args: any[];
};
type ReducerType = React.Reducer<ITableForm, DispatchType>;
const reducer: ReducerType = (state, action) => {
	const arg0 = action.args.length >= 1 ? action.args[0] : undefined;
	const arg1 = action.args.length >= 2 ? action.args[1] : undefined;
	const newState = { ...state };
	switch (action.type) {
		case 'editingKey':
			newState.editingKey = arg0;
			return newState;
		case 'searchText':
			newState.searchText = arg0;
			return newState;
		case 'searchedColumn':
			newState.searchedColumn = arg0;
			return newState;
		case 'data':
			newState.data = arg0;
			return newState;
		case 'pagination':
			newState.pagination = {
				...newState.pagination,
				...arg0,
			};
			return newState;
		case 'setFilterAndSorter':
			newState.filteredInfo = arg0;
			newState.sortedInfo = arg1;
			return newState;
		default:
			throw new Error('找不到对应的action');
	}
};

// provider
const TableFormContext = createContext<{
	state: ITableForm;
	dispatch?: React.Dispatch<DispatchType>;
	[propName: string]: any;
}>({
	state: defualtState,
});
TableFormContext.displayName = '表格';

const TableFormContextProvider: React.FC<{
	value?: Object;
}> = (props) => {
	const [state, dispatch] = useReducer(reducer, defualtState);
	return (
		<TableFormContext.Provider value={{ state, dispatch, ...props.value }}>
			{props.children}
		</TableFormContext.Provider>
	);
};

export { TableFormContext, TableFormContextProvider };
