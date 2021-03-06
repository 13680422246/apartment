import React, { memo, useEffect, useState } from 'react';
import { Form, Input, Button, Skeleton } from 'antd';
import { POST } from '../../../js/proxy';
import { Hint } from '../../../components';
import { useTitle, classNames } from '../../../js';
import style from './index.module.scss';

const cls = classNames.bind(style);

interface IPros {}
/**
 * 完善用户信息
 */
const UserInfo: React.FC<IPros> = (props) => {
	useTitle('用户信息');
	const [form] = Form.useForm();
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true); // 骨架屏的加载状态
	const [btnLoading, setBtnLoading] = useState(false); // 提交按钮的加载状态
	// 获取用户信息
	useEffect(() => {
		setLoading(true);
		POST('/home/account/getCheckInInfo', {}, (data: any) => {
			setData(data);
			setLoading(false);
		});
	}, []);
	const handleClick = () => {
		// 验证表单信息
		form.validateFields().then((row) => {
			setBtnLoading(true); // 提交信息中
			POST(
				'/home/account/editCheckInInfo',
				row,
				() => {
					// success('修改成功');
					Hint({
						type: 'success',
						content: '修改成功',
					});
					setBtnLoading(false);
				},
				() => {
					setBtnLoading(false);
				}
			);
		});
	};
	return (
		<div className={cls('container')}>
			<Skeleton active loading={loading}>
				<Form form={form}>
					<Form.Item
						label='真实姓名'
						name='realname'
						initialValue={data != null ? data.realname : ''}
						rules={[
							{
								required: true,
								message: '真实姓名不能为空',
							},
						]}>
						<Input placeholder='请输入真实姓名' />
					</Form.Item>
					<Form.Item
						label='身份证'
						name='idcard'
						initialValue={data != null ? data.idcard : ''}
						rules={[
							{
								required: true,
								message: '身份证不能为空',
							},
							{
								min: 18,
								max: 18,
								message: '身份证号码位数为18位',
							},
							{
								pattern: new RegExp(
									/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
									'g'
								),
								message: '身份证格式错误',
							},
						]}>
						<Input placeholder='请输入身份证' />
					</Form.Item>
					<Form.Item
						label='手机号'
						name='phone'
						initialValue={data != null ? data.phone : ''}
						rules={[
							{
								required: true,
								message: '手机号不能为空',
							},
							{
								min: 11,
								max: 11,
								message: '手机号码位数为11个',
							},
							{
								pattern: new RegExp(
									/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
									'g'
								),
								message: '手机号码格式错误',
							},
						]}>
						<Input placeholder='请输入手机号码' />
					</Form.Item>
				</Form>
			</Skeleton>
			<Button block loading={btnLoading} onClick={handleClick}>
				提交
			</Button>
		</div>
	);
};
export default memo(UserInfo);
