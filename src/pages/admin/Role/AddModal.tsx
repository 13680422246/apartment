import React, { memo, useCallback } from 'react';
import { FormModal, FormModalProps } from '../../../components';
import { Button, Form, Input } from 'antd';
import { useSelector } from '../../../components/EditableTableForm/store';
import useDispatch from '../../../components/EditableTableForm/store/dispatch';
import { useRequest } from '../../../js';

interface IPros {
	url: string; // 添加提交的地方
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
	>('/admin/role/add', {
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
		({ row, setVisible, setConfirmLoading, resetFields }) => {
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
							dispatch.setData([...state.data, row]);
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
			title='添加角色'
			okButtonDisable={loading}
			callback={callback}
			component={
				<Button disabled={state.loading} type='primary'>
					添加角色
				</Button>
			}>
			<Form.Item
				label='角色名'
				name='rolename'
				rules={[
					{
						required: true,
						message: '角色名称不能为空',
					},
				]}>
				<Input placeholder='角色名' />
			</Form.Item>
			<Form.Item
				label='角色描述'
				name='remark'
				rules={[
					{
						required: true,
						message: '角色描述不能为空',
					},
				]}>
				<Input placeholder='角色描述' />
			</Form.Item>
		</FormModal>
	);
};
export default memo(AddModal);
