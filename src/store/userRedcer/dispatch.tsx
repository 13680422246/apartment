import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '..';
import { ACTION_SET_USER, ACTION_SET_PERMISSION } from './ActionTypes';
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
export const useUserDispatch = () => {
	const dispatch = useDispatch();
	return {
		login(user: { token: string; roleid: string; username: string }) {
			dispatch({
				type: ACTION_SET_USER,
				args: [user],
			});
		},
		logout() {
			dispatch({
				type: ACTION_SET_USER,
				args: [
					{
						token: '',
						roleid: '',
						username: '',
						permission: [],
					},
				],
			});
		},
		setPermission(permission: any[]) {
			dispatch({
				type: ACTION_SET_PERMISSION,
				args: [permission],
			});
		},
	};
};
