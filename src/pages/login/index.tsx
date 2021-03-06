import React, { memo } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { NavLink } from 'react-router-dom';
import { CaptchaItem, PwdItem, UsernameItem } from '../../components';
import style from './index.module.scss';
import { useRequest, useTitle } from '../../js';
import {
	useUserDispatch,
	useLoginGoBack,
} from '../../store/userRedcer/dispatch';

interface PostData {
	username: string;
	pwd: string;
	captcha: string;
}
interface ResData {
	type: 'success' | 'error';
	token?: string;
	msg?: string;
	roleid?: string;
}
const Login: React.FC = () => {
	const dispatch = useUserDispatch();

	useTitle('登录'); // 修改title
	useLoginGoBack(); // 登录之后go back

	// 发送登录请求
	const { run, loading } = useRequest<ResData, PostData>(
		'/home/account/login',
		{
			onSuccess: ({ data, params, Hint }) => {
				if (data.type === 'error') {
					Hint({
						type: 'error',
						content: data.msg as string,
					});
				} else {
					dispatch.login({
						username: params?.username as string,
						token: data.token as string,
						roleid: data.roleid as string,
					});
				}
			},
		}
	);
	const requestLogin = (values: PostData) => {
		run(values);
	};
	return (
		<Row justify='center' className={style.container}>
			<Col>
				<p className='text-align'>公寓管理系统-登录</p>
				<Form name='login' onFinish={requestLogin}>
					<UsernameItem />
					<PwdItem />
					<CaptchaItem />
					<Form.Item>
						<Button
							loading={loading}
							type='primary'
							htmlType='submit'
							className='login-form-button'
							block>
							登录
						</Button>
					</Form.Item>
					<Form.Item className={style.register}>
						<NavLink to='/register'>现在注册</NavLink>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};
export default memo(Login);
