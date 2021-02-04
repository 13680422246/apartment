import React, { memo, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { useRequest, useTitle, classNames } from '../../../js';
import style from './index.module.scss';

const cls = classNames.bind(style);

interface IPros {}
/**
 * 更新密码
 */
const UpdatePwd: React.FC<IPros> = (props) => {
	useTitle('修改密码');
	const [form] = Form.useForm();

	/**
	 * 请求接口
	 */
	const { run, loading } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{
			originpwd: string;
			newpwd: string;
		}
	>('/home/account/editPwd', {
		onSuccess: ({ Hint, data }) => {
			Hint({
				type: data.type,
				content: data.type === 'error' ? data.msg : '修改成功',
			});
		},
	});

	/**
	 * 点击修改按钮
	 */
	const handleClick = useCallback(() => {
		form.validateFields().then((row) => {
			run({
				originpwd: row.originpwd,
				newpwd: row.newpwd,
			});
		});
	}, [form, run]);

	return (
		<div className={cls('container')}>
			<Form form={form}>
				<Form.Item
					label='原密码'
					name='originpwd'
					rules={[
						{
							required: true,
							message: '密码不能为空',
						},
					]}>
					<Input type='password' placeholder='密码' />
				</Form.Item>
				<Form.Item
					label='新密码'
					name='newpwd'
					rules={[
						{
							required: true,
							message: '新密码不能为空',
						},
					]}>
					<Input type='password' placeholder='新密码' />
				</Form.Item>
				<Form.Item
					label='再次输入密码'
					name='aginpwd'
					dependencies={['newpwd']}
					rules={[
						{
							required: true,
							message: '再次输入密码不能为空',
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (
									!value ||
									getFieldValue('newpwd') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject('俩次密码不一致');
							},
						}),
					]}>
					<Input type='password' placeholder='再次输入密码' />
				</Form.Item>
			</Form>
			<Button loading={loading} block onClick={handleClick}>
				提交
			</Button>
		</div>
	);
};
export default memo(UpdatePwd);
