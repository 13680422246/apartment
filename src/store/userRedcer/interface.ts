export interface UserState {
	token: string;
	roleid: string;
	username: string;
	permission: {
		id: string;
		name: string;
		url: string;
	}[];
}
