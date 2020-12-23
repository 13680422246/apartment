export interface TableFormInterface {
	data: any[];
	pagination: {
		current: number;
		total: number;
		pageSize: number;
	};
	filteredInfo: Object;
	sortedInfo: Object;
	editingKey: string;
	searchText: '';
	searchedColumn: '';
	form: unknown;
	select: unknown;
}
