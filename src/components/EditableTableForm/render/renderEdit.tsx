import React, { memo, useContext } from 'react';
import { TableFormContext } from '../Provider';
import { Popconfirm } from 'antd';
import A from './A';

interface IPros {
	record: any;
	handleSave?: Function;
}
const Edit: React.FC<IPros> = memo((props) => {
	const { state, dispatch, form } = useContext(TableFormContext);

	/**
	 * 点击编辑按钮
	 * @param record
	 */
	const edit = (record: any) => {
		form.setFieldsValue({
			...record,
		});
		dispatch &&
			dispatch({
				type: 'editingKey',
				args: [record.id],
			});
	};

	/**
	 * 取消编辑
	 */
	const cancel = () => {
		dispatch &&
			dispatch({
				type: 'editingKey',
				args: [''],
			});
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
				const defaultHandleData = (newRow = row) => {
					const newData = [...state.data]; // clone
					const index = newData.findIndex(
						(item) => newRow.id === item.id
					);
					newData.splice(index, 1, {
						...newData[index],
						...newRow,
					});
					return newData;
				};
				cancel();
				props.handleSave && props.handleSave(row, defaultHandleData);
			});
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	return props.record.id === state.editingKey ? (
		<span
			style={{
				marginRight: 8,
			}}>
			<A
				handleClick={() => {
					save(props.record);
				}}>
				保存
			</A>
			<Popconfirm title='确定取消?' onConfirm={cancel}>
				<A>取消</A>
			</Popconfirm>
		</span>
	) : (
		<A
			handleClick={() => {
				edit(props.record);
			}}>
			编辑
		</A>
	);
});

const renderEdit = (text: string, record: any, handleSave: Function) => {
	// 编辑的时候不能删除
	return <Edit record={record} handleSave={handleSave} />;
};
export default renderEdit;
