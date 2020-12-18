import { Col, Form, Image, Input, Row, Spin } from 'antd';
import { Rule } from 'antd/lib/form';
import React, { memo } from 'react';
import { useCheckCodeURL } from '../../utils';

interface IPros {
	name?: string;
	rules?: Rule[];
}
const defaultProps: IPros = {
	name: 'captcha',
	rules: [
		{
			required: true,
			message: '验证码不能为空',
		},
		{
			min: 4,
			max: 4,
			message: '验证码长度为4',
		},
	],
};
const CaptchaItem: React.FC<IPros> = (props) => {
	const { captcha, refreshCheckCode } = useCheckCodeURL();
	return (
		<Form.Item name={props.name} rules={props.rules}>
			<Row>
				<Col span={12}>
					<Image
						width={140}
						height={40}
						onClick={refreshCheckCode}
						src={captcha}
						alt='验证码'
						preview={false}
						placeholder={
							<Spin
								style={{
									position: 'absolute',
									left: '40%',
									top: '40%',
									transform: 'transition(-50%,0)',
								}}
							/>
						}
					/>
				</Col>
				<Col span={12}>
					<Input
						style={{
							height: '40px',
						}}
						type='text'
						placeholder='验证码'
					/>
				</Col>
			</Row>
		</Form.Item>
	);
};
CaptchaItem.defaultProps = defaultProps;
export default memo(CaptchaItem);
