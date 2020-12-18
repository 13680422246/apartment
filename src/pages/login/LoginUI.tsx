import { Button, Col, Form, Row } from 'antd';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { CaptchaItem, PwdItem, UsernameItem } from '../../components';
import style from './index.module.scss';

interface IPros {
	requestLogin: (values: any) => void;
}
const LoginUi: React.FC<IPros> = (props) => {
	return (
		<Row justify='center' className={style.container}>
			<Col>
				<p className='text-align'>公寓管理系统-登录界面</p>
				<Form name='login' onFinish={props.requestLogin}>
					<UsernameItem />
					<PwdItem />
					<CaptchaItem />
					<Form.Item>
						<Button
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

export default memo(LoginUi);
