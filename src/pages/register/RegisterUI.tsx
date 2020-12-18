import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { CaptchaItem, PwdItem, UsernameItem } from '../../components';

interface IPros {
	requestRegister: (values: any) => void;
}
const RegisterUi: React.FC<IPros> = (props) => {
	return (
		<Row
			justify='center'
			style={{
				position: 'absolute',
				top: '20%',
				left: '50%',
				transform: 'translate(-50%,10px)',
			}}>
			<Col>
				<p className='text-align'>注册</p>
				<Form name='login' onFinish={props.requestRegister}>
					<UsernameItem />
					<PwdItem />
					<Form.Item
						hasFeedback
						name='againpwd'
						dependencies={['pwd']}
						rules={[
							{
								required: true,
								message: '再次输入密码不能为空',
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (
										!value ||
										getFieldValue('pwd') === value
									) {
										return Promise.resolve();
									}
									return Promise.reject('俩次密码不一致');
								},
							}),
						]}>
						<Input.Password
							prefix={
								<LockOutlined className='site-form-item-icon' />
							}
							placeholder='再次输入密码'
						/>
					</Form.Item>
					<CaptchaItem />
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
							block>
							注册
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};

export default RegisterUi;
