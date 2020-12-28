import { useDispatch as useTableFormDispatch, useSelector } from '.';
import { IPagination } from './state';

function useDispatch() {
	const state = useSelector((store) => store.state);
	const dispatch = useTableFormDispatch();
	return {
		// loading
		setLoading(bool: boolean) {
			dispatch({
				type: 'loading',
				args: [bool],
			});
		},
		// disable
		getDisable() {
			return state.editingKey !== '';
		},
		// 设置数据源
		setData(datasource: any[]) {
			dispatch({
				type: 'data',
				args: [datasource],
			});
		},
		// 删除数据
		deleteData(id: string) {
			const index = state.data.findIndex((item) => item.id === id);
			if (index !== -1) {
				const datasource = [...state.data];
				datasource.splice(index, 1);
				dispatch({
					type: 'data',
					args: [datasource],
				});
			}
		},
		// 编辑数据
		editData(row: any) {
			const newData = [...state.data]; // clone
			const index = newData.findIndex((item) => row.id === item.id);
			newData.splice(index, 1, {
				...newData[index],
				...row,
			});
			dispatch({
				type: 'data',
				args: [newData],
			});
		},
		// 设置editingKey
		setEditingKey(editingKey: string) {
			dispatch({
				type: 'editingKey',
				args: [editingKey],
			});
		},
		// setFilterAndSorter
		setFilterAndSorter(filters: any, sorter: any) {
			dispatch({
				type: 'setFilterAndSorter',
				args: [filters, sorter],
			});
		},
		// pagination
		setPagination(data: IPagination) {
			dispatch({
				type: 'pagination',
				args: [data],
			});
		},
		// 搜索文本
		setSearchText(text: string) {
			dispatch({
				type: 'searchText',
				args: [text],
			});
		},
		// 搜索列
		setSearchedColumn(dataIndex: string) {
			dispatch({
				type: 'searchedColumn',
				args: [dataIndex],
			});
		},
	};
}
export default useDispatch;
