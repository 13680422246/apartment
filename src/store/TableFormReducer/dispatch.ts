import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '..';
import { TableFormInterface } from './interface';
import {
	ACTION_SET_DATA,
	ACTION_SET_PAGINATION,
	ACTION_SET_EDITINGKEY,
	ACTION_SET_FORM,
	ACTION_SET_SEARCH_TEXT,
	ACTION_SET_SEARCH_COLUMN,
	ACTION_SET_SELECT,
	ACTION_SET_RESET,
	ACTION_SET_FILTERS_AND_SORTER,
} from './ActionTypes';

export const useTableFormStore = () => {
	return useSelector((store: IStore) => store.tableForm);
};
export const useTableFormDispatch = () => {
	const dispatch = useDispatch();
	return {
		setPagination(data: TableFormInterface['pagination']) {
			dispatch({
				type: ACTION_SET_PAGINATION,
				args: [
					{
						current: data.current,
						total: data.total,
						pageSize: data.pageSize,
					},
				],
			});
		},
		setFilterAndSorter(filters: Object, sorter: Object) {
			dispatch({
				type: ACTION_SET_FILTERS_AND_SORTER,
				args: [filters, sorter],
			});
		},
		setData(data: unknown[]) {
			dispatch({
				type: ACTION_SET_DATA,
				args: [data],
			});
		},
		setEditingKey(editingKey: string) {
			dispatch({
				type: ACTION_SET_EDITINGKEY,
				args: [editingKey],
			});
		},
		// 判断当前对象是否在编辑中
		isEditing(
			record: {
				id: string;
			},
			editingKey: string
		) {
			return record.id === editingKey;
		},
		setForm(form: unknown) {
			dispatch({
				type: ACTION_SET_FORM,
				args: [form],
			});
		},
		setSearchText(text: string) {
			dispatch({
				type: ACTION_SET_SEARCH_TEXT,
				args: [text],
			});
		},
		setSearchedColumn(column: unknown[]) {
			dispatch({
				type: ACTION_SET_SEARCH_COLUMN,
				args: [column],
			});
		},
		setSelect(func: Function) {
			dispatch({
				type: ACTION_SET_SELECT,
				args: [func],
			});
		},
		reset(value: any) {
			dispatch({
				type: ACTION_SET_RESET,
				args: [value],
			});
		},
	};
};
