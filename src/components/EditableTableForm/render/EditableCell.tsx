import React, { memo } from 'react';
// antd
import { Input, InputNumber, Form } from 'antd';

const defaultProps = {
	inputType: 'string',
};
const EditableCell: React.FC<{
	dataIndex: string;
	inputType: string;
	rules: any[];
	record: any;
	editing: string;
}> = (props) => {
	const {
		children,
		dataIndex,
		rules,
		inputType,
		record,
		editing,
		...restProps
	} = props;
	let inputNode;
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
	return <td {...restProps}>{editing ? <>{inputNode}</> : children}</td>;
};
EditableCell.defaultProps = defaultProps;
export default memo(EditableCell);
