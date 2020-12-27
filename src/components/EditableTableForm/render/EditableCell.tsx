import React, { memo, useContext } from 'react';
import { Input, InputNumber, Form } from 'antd';
import { TableFormContext } from '../Provider';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	inputType: 'number' | 'text' | 'textarea' | 'image';
	record: any;
	index: number;
	children: React.ReactNode;
	rules: any[];
}
const EditableCell: React.FC<EditableCellProps> = (props) => {
	const { state } = useContext(TableFormContext);
	const {
		editing,
		children,
		dataIndex,
		rules,
		inputType,
		record,
		...restProps
	} = props;
	let inputNode;
	// 正在编辑的状态
	const editable = props.record && state.editingKey === props.record.id;
	const CommonItem: React.FC<{}> = (props) => {
		return (
			<Form.Item
				name={dataIndex}
				style={{
					margin: 0,
				}}
				rules={rules}>
				{props.children}
			</Form.Item>
		);
	};
	switch (inputType) {
		case 'number':
			inputNode = (
				<CommonItem>
					<InputNumber />
				</CommonItem>
			);
			break;
		case 'textarea':
			inputNode = (
				<CommonItem>
					<Input.TextArea rows={4} />
				</CommonItem>
			);
			break;
		case 'image':
			inputNode = <>编辑上传组件</>;
			break;
		default:
			inputNode = (
				<CommonItem>
					<Input />
				</CommonItem>
			);
	}
	return <td {...restProps}>{editable ? <>{inputNode}</> : children}</td>;
};
export default memo(EditableCell);
