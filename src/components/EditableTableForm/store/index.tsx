import { generateStore } from '../../../js';
import { ITableForm, defaultState } from './state';
import { IDispatchType, reducer } from './action';

const { Context, Provider, useSelector, useDispatch } = generateStore<
	ITableForm,
	IDispatchType
>(defaultState, reducer);

Context.displayName = '表格';
export { Context, Provider, useSelector, useDispatch };
