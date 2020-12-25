import { UserState } from './interface';

export const ACTION_SET_USER = Symbol('设置用户信息');
export const Methods: {
	[propsName: string]: (state: UserState, ...value: any) => UserState;
} = {
	[ACTION_SET_USER](state, value) {
		const token = value.token === undefined ? state.token : value.token;
		const roleid = value.roleid === undefined ? state.roleid : value.roleid;
		const username =
			value.username === undefined ? state.username : value.username;

		state.token = token;
		state.roleid = roleid;
		state.username = username;
		return state;
	},
};
