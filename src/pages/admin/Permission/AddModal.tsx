import React, { memo, useCallback } from 'react';
import { FormModal, FormModalProps } from '../../../components';
import { Button, Form, Input } from 'antd';
import { useSelector } from '../../../components/EditableTableForm/store';
import useDispatch from '../../../components/EditableTableForm/store/dispatch';
import { useRequest } from '../../../utils';

interface IPros {
	url: string; // 添加提交的地方
	title: string; // modal标题
	parentid: string; // 父权限id
}
const AddModal: React.FC<IPros> = (props) => {
	const state = useSelector((store) => store.state);
	const dispatch = useDispatch();

	const { run, loading } = useRequest<
		{
			type: 'success' | 'error';
			msg: string; // 角色id
		},
		any
	>(props.url, {
		onSuccess: ({ Hint, data }) => {
			const { type, msg } = data;
			if (type === 'error') {
				Hint({
					type: 'error',
					content: msg,
				});
			} else {
				Hint({
					type: 'success',
					content: '添加成功',
				});
			}
		},
	});

	const callback = useCallback<NonNullable<FormModalProps['callback']>>(
		({ row, setConfirmLoading, setVisible, resetFields }) => {
			setConfirmLoading(true); // 确认按钮loading
			run(row).then((res) => {
				if (res && res.running === true) {
					const { data } = res;
					if (data && data.type === 'success') {
						// 添加数据到table
						// 最后一页才添加
						const { current, total, pageSize } = state.pagination;
						if (current > total / pageSize) {
							row.id = data.msg;
							if (row.parentid === '') {
								// 顶级权限直接放到列表最后
								dispatch.setData([...state.data, row]);
							} else {
								// 子级权限放到父权限下面
								const newData = [...state.data];
								for (const item of newData) {
									// 找到父级菜单
									if (item.id === row.parentid) {
										if (item.children === undefined) {
											item.children = [];
										}
										item.children.push(row);
										break;
									}
								}
								dispatch.setData(newData);
							}
						}
						setVisible(false); // 关闭modal
						resetFields(); // reset Form表单
					}
				}
				setConfirmLoading(false); // 确认按钮结束loading
			});
		},
		[dispatch, run, state.data, state.pagination]
	);

	return (
		<FormModal
			disabled={dispatch.getDisable()}
			title={props.title}
			okButtonDisable={loading}
			callback={callback}
			component={
				props.parentid === '' ? (
					<Button disabled={state.loading} type='primary'>
						添加权限
					</Button>
				) : (
					<span>添加子权限</span>
				)
			}>
			<Form.Item name='parentid' initialValue={props.parentid}>
				<Input disabled />
			</Form.Item>
			<Form.Item
				label='权限名'
				name='name'
				rules={[
					{
						required: true,
						message: '权限名称不能为空',
					},
				]}>
				<Input placeholder='权限名称' />
			</Form.Item>
			<Form.Item
				label='URL'
				name='url'
				rules={[
					{
						required: true,
						message: 'url不能为空',
					},
					{
						pattern: new RegExp(/^\/[a-z | A-Z | /]+$/, 'g'),
						message: 'URL格式错误',
					},
				]}>
				<Input placeholder='URL' />
			</Form.Item>
		</FormModal>
	);
};
export default memo(AddModal);
