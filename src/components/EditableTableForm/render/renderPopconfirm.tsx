import React, { memo, useContext } from 'react';
import { Popconfirm, Spin } from 'antd';
import { DispatchType, TableFormContext } from '../Provider';
import A from './A';
import { useRequest } from '../../../utils';

interface IOperator {
	delete: () => any[] | undefined;
}
export interface IActionPopconfirm {
	[propname: string]: any;
	popconfirm: {
		url: string;
		text: string;
		HintText: string;
		callback: (params: {
			Hint: (content: string) => void;
			dispatch: React.Dispatch<DispatchType>;
			operator: IOperator;
		}) => void;
	};
}

interface IProps {
	record: any;
	col: IActionPopconfirm;
}
const Delete: React.FC<IProps> = memo((props) => {
	const { popconfirm } = props.col;
	const { state, dispatch } = useContext(TableFormContext);
	/**
	 * 发送请求
	 */
	const { url, callback } = props.col.popconfirm;
	const { run, loading } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{ id: string }
	>(url, {
		options: {
			unsafe: true,
		},
		onSuccess: ({ data, Hint, values }) => {
			if (data.type === 'error') {
				Hint({
					type: data.type,
					content: data.msg,
				});
			} else {
				/**
				 * 交给用户处理
				 */
				if (dispatch) {
					callback({
						Hint: (content: string) => {
							Hint({
								type: data.type,
								content,
							});
						},
						dispatch,
						operator,
					});
				}
			}
		},
	});
	/**
	 * 默认的本地处理
	 */
	const operator: IOperator = {
		delete: () => {
			const index = state.data.findIndex(
				(item) => item.id === props.record.id
			);
			if (index !== -1) {
				const datasource = [...state.data];
				datasource.splice(index, 1);
				return datasource;
			}
		},
	};

	const disabled = state.editingKey !== '';
	return (
		<Spin spinning={loading}>
			<Popconfirm
				disabled={loading}
				title={popconfirm.HintText}
				onConfirm={() => {
					run({
						id: props.record.id,
					});
				}}>
				<span>
					<A disable={disabled}>{popconfirm.text}</A>
				</span>
			</Popconfirm>
		</Spin>
	);
});

const renderDelete = (text: string, record: any, col: any) => {
	// 编辑的时候不能删除
	return <Delete record={record} col={col} />;
};
export default renderDelete;
