import { Popconfirm, Space } from 'antd';
import React, { memo, useContext } from 'react';
import { useRequest } from '../../../utils';
import { DispatchType, TableFormContext } from '../Provider';
import A from './A';
import { Spin } from 'antd';

export interface IActionSave {
	[propname: string]: any;
	editor: {
		url: string;
		callback: (params: {
			Hint: (content: string) => void;
			dispatch: React.Dispatch<DispatchType>;
			defaultHandleData: () => any[];
			cancel: () => void;
		}) => void;
	};
}
interface IPros {
	record: any;
	col: IActionSave;
}
const Edit: React.FC<IPros> = memo((props) => {
	const { state, dispatch, form } = useContext(TableFormContext);
	const { url } = props.col.editor;
	const { run, loading } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		any
	>(url, {
		onSuccess: ({ Hint, data, params }) => {
			if (data.type === 'error') {
				Hint({
					type: 'error',
					content: data.msg,
				});
			} else {
				if (
					typeof props.col.editor.callback === 'function' &&
					dispatch
				) {
					props.col.editor.callback({
						Hint: (content: string) => {
							Hint({
								type: 'success',
								content,
							});
						},
						dispatch,
						defaultHandleData: () => {
							return defaultHandleData(params);
						},
						cancel,
					});
				}
			}
		},
	});

	/**
	 * 点击编辑按钮
	 * @param record
	 */
	const edit = (record: any) => {
		if (form && dispatch) {
			form.setFieldsValue({
				...record,
			});
			dispatch({
				type: 'editingKey',
				args: [record.id],
			});
		}
	};

	/**
	 * 取消编辑
	 */
	const cancel = () => {
		if (dispatch) {
			dispatch({
				type: 'editingKey',
				args: [''],
			});
		}
	};

	/**
	 * 默认的本地处理
	 */
	const defaultHandleData = (newRow: any) => {
		const newData = [...state.data]; // clone
		const index = newData.findIndex((item) => newRow.id === item.id);
		newData.splice(index, 1, {
			...newData[index],
			...newRow,
		});
		return newData;
	};

	/**
	 * 保存编辑数据
	 * @param record
	 */
	const save = async (record: any) => {
		try {
			// 验证表单 - record是旧数据, row是新数据
			form.validateFields().then((row: any) => {
				row.id = record.id;
				run(row);
			});
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const editable = state.editingKey === props.record.id; // 正在编辑的状态
	const disabled = state.editingKey !== '';
	return editable ? (
		<Spin spinning={loading} tip='保存中'>
			<Space>
				<A
					handleClick={() => {
						save(props.record);
					}}>
					保存
				</A>
				<Popconfirm
					title='确定取消?'
					onConfirm={() => {
						cancel();
					}}>
					<span>
						<A>取消</A>
					</span>
				</Popconfirm>
			</Space>
		</Spin>
	) : (
		<A
			disable={disabled}
			handleClick={() => {
				edit(props.record);
			}}>
			编辑
		</A>
	);
});

const renderEdit = (text: string, record: any, col: any) => {
	// 编辑的时候不能删除
	return <Edit record={record} col={col} />;
};
export default renderEdit;
