import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '..';
import { ACTION_SET_USER } from './ActionTypes';
import { useHistory } from 'react-router-dom';

export const useUserStore = () => {
	return useSelector((store: IStore) => store.user);
};
/**
 * 如果用户已经登录，则go back
 */
export const useLoginGoBack = () => {
	const store = useUserStore();
	const history = useHistory();
	useEffect(() => {
		if (store.token !== '') {
			history.goBack();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [store.token]);
};
/**
 * 如果用户不是管理员，则go back
 */
export const useNotAdminThenGoBack = () => {
	const store = useUserStore();
	const history = useHistory();
	useEffect(() => {
		if (store.roleid === '') {
			history.push('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [store.roleid]);
};
export const useUserDispatch = () => {
	const dispatch = useDispatch();
	return {
		// 实现用户登录
		login(user: { token: string; roleid: string; username: string }) {
			dispatch({
				type: ACTION_SET_USER,
				args: [user],
			});
		},
		// 注销用户
		logout() {
			dispatch({
				type: ACTION_SET_USER,
				args: [
					{
						token: '',
						roleid: '',
						username: '',
					},
				],
			});
		},
	};
};
