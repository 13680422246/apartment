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
