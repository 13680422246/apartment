export interface Filter {
	title: React.ReactNode;
	min: number | undefined;
	max: number | undefined;
}
export interface RoomState {
	data: any[];
	pagination: {
		current: number;
		total: number;
		pageSize: number;
	};
	price: Filter;
	area: Filter;
	dir: {
		title: string;
		content: string;
	};
	hasNextPage: boolean;
	searchText: string;
}
