import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import React, { memo } from 'react';
import { Rule } from 'antd/lib/form';

interface IPros {
	name?: string;
	placeholder?: string;
	rules?: Rule[];
}
const defaultProps: IPros = {
	name: 'pwd',
	placeholder: '密码',
	rules: [
		{
			required: true,
			message: '密码不能为空',
		},
	],
};
const PwdItem: React.FC<IPros> = (props) => {
	return (
		<Form.Item hasFeedback name={props.name} rules={props.rules}>
			<Input.Password
				prefix={<LockOutlined className='site-form-item-icon' />}
				placeholder={props.placeholder}
			/>
		</Form.Item>
	);
};
PwdItem.defaultProps = defaultProps;
export default memo(PwdItem);
