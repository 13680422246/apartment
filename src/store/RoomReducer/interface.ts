export interface Filter {
	title: React.ReactNode;
	min: number | undefined;
	max: number | undefined;
}
export interface RoomState {
	price: Filter;
	area: Filter;
	dir: {
		title: string;
		content: string;
	};
}
