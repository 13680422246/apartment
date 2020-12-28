import { Popconfirm, Space } from 'antd';
import React, { memo } from 'react';
import A from '../../A';
import { useSelector } from '../store';
import useDispatch from '../store/dispatch';

export interface IActionSave {
	[propname: string]: any;
	editor: {
		callback: (params: {
			row: any;
			cancel: () => void;
			setLoading: (bool: boolean) => void;
			setData: (data: any) => void;
			editData: (row: any) => void;
		}) => void;
	};
}
interface IPros {
	record: any;
	col: IActionSave;
}
const Edit: React.FC<IPros> = memo((props) => {
	const { state, form } = useSelector((store) => store);
	const dispatch = useDispatch();

	/**
	 * 点击编辑按钮
	 * @param record
	 */
	const edit = (record: any) => {
		if (form && dispatch) {
			form.setFieldsValue({
				...record,
			});
			dispatch.setEditingKey(record.id);
		}
	};

	/**
	 * 取消编辑
	 */
	const cancel = () => {
		if (dispatch) {
			dispatch.setEditingKey('');
		}
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
				// run(row);
				props.col.editor.callback({
					row,
					cancel,
					setLoading: dispatch.setLoading,
					setData: dispatch.setData,
					editData: dispatch.editData,
				});
			});
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const editable = state.editingKey === props.record.id; // 正在编辑的状态
	return editable ? (
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
	) : (
		<A
			disable={dispatch.getDisable()}
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
