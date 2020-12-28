import { createContext, useReducer, useCallback, useContext } from 'react';

/**
 *
 * @param defualtState 默认的state
 * @param reducer reducer
 * @returns {
 *  Provider, // React组件，服务提供者
 *  Context, // 上下文对象，用于获取state和dispatch
 * }
 */
function generateStore<IState, IAction>(
	defualtState: IState,
	reducer: React.Reducer<IState, IAction>
) {
	//#region + TODO: 类型系统
	// action的类型
	type IActionType = IAction | ((dispatch: React.Dispatch<IAction>) => void);
	// dispatch函数的类型
	type IDispatchType = React.Dispatch<IActionType>;
	// context服务提供者的类型
	type IContext = {
		state: IState;
		dispatch?: IDispatchType;
		[key: string]: any;
	};
	//#endregion

	//#region + TODO: context上下文
	const Context = createContext<IContext>({
		state: defualtState,
	});
	//#endregion

	//#region + TODO: provider
	/**
	 * provider - 支持传入其他的value提供下去
	 * @param props
	 */
	const Provider: React.FC<{
		values?: {
			[key: string]: any;
		};
	}> = (props) => {
		const [state, dispatch] = useReducer(reducer, defualtState);
		/**
		 * 包装dispatch
		 */
		const WrapperDispatch = useCallback((action: IActionType) => {
			if (typeof action === 'function') {
				(action as Function)(dispatch);
			} else {
				dispatch(action);
			}
		}, []);
		return (
			<Context.Provider
				value={{ state, dispatch: WrapperDispatch, ...props.values }}>
				{props.children}
			</Context.Provider>
		);
	};
	Provider.defaultProps = {
		values: {},
	};
	//#endregion

	//#region + TODO: useSelector
	/**
	 * useSelector
	 * @param selector 选择器
	 */
	function useSelector<TSelected = unknown>(
		selector: (store: IContext) => TSelected
	): TSelected {
		const store = useContext(Context);
		return selector(store);
	}
	//#endregion

	//#region + TODO: useDispatch
	function useDispatch() {
		const { dispatch } = useContext(Context);
		if (!dispatch) {
			throw new Error('该组件不是服务提供者的子组件');
		}
		return dispatch;
	}
	//#endregion

	return {
		Provider,
		Context,
		useSelector,
		useDispatch,
	};
}
export default generateStore;
