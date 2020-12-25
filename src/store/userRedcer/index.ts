import { UserState } from './interface';
import { CommonFuncHnalder } from '..';
import { Methods } from './ActionTypes';

const defaultState: UserState = {
	token: '', // token
	roleid: '', // 角色id
	username: '', // 用户名
};
export default CommonFuncHnalder<UserState>(defaultState, Methods);
