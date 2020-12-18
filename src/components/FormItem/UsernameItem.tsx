import React, { memo } from 'react';
import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Rule } from 'antd/lib/form';

interface IPros {
	name?: string;
	placeholder?: string;
	rules?: Rule[];
}
const defaultProps: IPros = {
	name: 'username',
	placeholder: '用户名',
	rules: [
		{
			required: true,
			message: '用户名不能为空',
		},
		{
			min: 2,
			max: 11,
			message: '长度不在范围内',
		},
	],
};
const UsernameItem: React.FC<IPros> = (pros) => {
	return (
		<Form.Item hasFeedback name={pros.name} rules={pros.rules}>
			<Input
				prefix={<UserOutlined className='site-form-item-icon' />}
				placeholder={pros.placeholder}
			/>
		</Form.Item>
	);
};
UsernameItem.defaultProps = defaultProps;

export default memo(UsernameItem);
