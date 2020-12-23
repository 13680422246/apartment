import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { memo } from 'react';
import { CaptchaItem, PwdItem, UsernameItem } from '../../components';
import {
	useLoginGoBack,
	useUserDispatch,
} from '../../store/userRedcer/dispatch';
import { useRequest, useTitle } from '../../utils';

interface PostData {
	username: string;
	pwd: string;
	captcha: string;
	againpwd?: string;
}
interface ResData {
	type: 'success' | 'error';
	msg?: string;
	token?: string;
}
const Login: React.FC = () => {
	const dispatch = useUserDispatch();

	useTitle('注册'); // 修改title
	useLoginGoBack(); // 用户登录之后 go back

	// 发送注册请求
	const { run, loading } = useRequest<ResData, PostData>(
		'/home/account/register',
		{
			onSuccess: ({ data, params, Hint }) => {
				if (data.type === 'error') {
					Hint({
						type: 'error',
						content: data.msg as string,
					});
				} else {
					dispatch.login({
						token: data.token as string,
						roleid: '',
						username: params?.username as string,
					});
				}
			},
		}
	);

	const requestRegister = (values: PostData) => {
		delete values.againpwd;
		run(values);
	};
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
				<p className='text-align'>公寓管理系统-注册</p>
				<Form name='login' onFinish={requestRegister}>
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
							loading={loading}
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
export default memo(Login);
