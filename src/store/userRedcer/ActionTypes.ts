import { UserState } from './interface';

export const ACTION_SET_USER = Symbol('登录后设置的用户状态');
export const ACTION_SET_PERMISSION = Symbol('设置登录账户的权限');
export const Methods: {
	[propsName: string]: (state: UserState, ...value: any) => UserState;
} = {
	[ACTION_SET_USER](state, value) {
		const token = value.token === undefined ? state.token : value.token;
		const roleid = value.roleid === undefined ? state.roleid : value.roleid;
		const username =
			value.username === undefined ? state.username : value.username;
		const permission =
			value.permission === undefined
				? state.permission
				: value.permission;
		state.token = token;
		state.roleid = roleid;
		state.username = username;
		state.permission = permission;
		return state;
	},
	[ACTION_SET_PERMISSION](state, value) {
		state.permission = value;
		return state;
	},
};
