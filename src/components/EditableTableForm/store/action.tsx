import { ITableForm } from './state';
export type IDispatchType = {
	type: string;
	args: any[];
};
export const reducer = (state: ITableForm, action: IDispatchType) => {
	const arg0 = action.args.length >= 1 ? action.args[0] : undefined;
	const arg1 = action.args.length >= 2 ? action.args[1] : undefined;
	const newState = { ...state };
	switch (action.type) {
		case 'loading':
			newState.loading = arg0;
			return newState;
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
