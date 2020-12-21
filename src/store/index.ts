import { createStore, combineReducers, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认web的localStorage

// reducer
import RoomReducer from './RoomReducer';
import { RoomState } from './RoomReducer/interface';
import userRedcer from './userRedcer';
import { UserState } from './userRedcer/interface';

// 合并reducer
const reducer = combineReducers<IStore>({
	room: RoomReducer,
	user: userRedcer,
});
// 持久化存储reducer
const persistedReducer = persistReducer(
	{
		key: 'root',
		storage,
		whitelist: ['user'],
	},
	reducer
);
export interface IStore {
	room: RoomState;
	user: UserState;
}
export const store: Store<IStore> = createStore(persistedReducer);
export const persistedStore = persistStore(store);

/**
 * 提供统一的处理函数
 */
interface IAction {
	type: string;
	args: any[];
}
export function CommonFuncHnalder<T>(
	defaultState: T,
	Methods: {
		[propsName: string]: (state: T, ...value: any) => T;
	}
) {
	return (preState = defaultState, action: IAction) => {
		let state = { ...preState }; // 拷贝一份
		// 改变state的函数
		let func = Methods[action.type];
		if (func) {
			// 如果函数存在
			// 参数：oneOf(string,array,null)
			let { args } = action;
			if (args === undefined) {
				args = [];
			} // 不存在
			else if (!(args instanceof Array)) {
				args = [args];
			} // 只有一个
			return func(state, ...args);
		}
		return preState;
	};
}
