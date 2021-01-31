import React, { memo, useCallback } from 'react';
import { A } from '../../../components';
import useDispatch from '../../../components/EditableTableForm/store/dispatch';
import { useRequest, useToggle } from '../../../js';
import { Modal, Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

interface IPros {
	record: any;
}
/**
 * 雇佣员工
 */
const Employ: React.FC<IPros> = (props) => {
	const [form] = Form.useForm();
	const { visible, toggle } = useToggle();
	const dispatch = useDispatch();

	/**
	 * 请求所有的角色
	 */
	const { loading, data, run } = useRequest<
		{
			list: {
				id: number;
				rolename: string;
				remark: string;
			}[];
		},
		{}
	>('/admin/roomer/findAllRole', {});

	/**
	 * 添加新的员工
	 */
	const { run: addRole, loading: roleLoading } = useRequest<
		{
			type: 'error' | 'success';
			msg: string;
		},
		{
			userid: number;
			roleid: number;
			salary: number;
		}
	>('/admin/staff/add', {
		onSuccess: ({ Hint, data }) => {
			if (data.type === 'error') {
				Hint({
					type: 'error',
					content: data.msg,
				});
			} else {
				Hint({
					type: 'success',
					content: '雇佣成功',
				});
			}
		},
	});

	/**
	 * 打开modal
	 */
	const openModal = useCallback(() => {
		run({});
		toggle();
	}, [toggle, run]);

	/**
	 * 提交表单
	 */
	const handleOK = useCallback(() => {
		form.validateFields().then((rows) => {
			addRole(rows).then((res) => {
				if (res && res.running) {
					if (res.data && res.data.type === 'success') {
						form.resetFields();
						toggle(); // 关闭modal
						// 删除数据
						dispatch.setData((datasource) => {
							const newData = [...datasource];
							const index = newData.findIndex(
								(item) => item.id === rows.userid
							);
							if (index !== -1) {
								newData.splice(index, 1);
							}
							return newData;
						});
					}
				}
			});
		});
	}, [form, addRole, toggle, dispatch]);

	return (
		<>
			<Modal
				title={`雇佣${props.record.realname}`}
				visible={visible}
				onCancel={toggle}
				onOk={handleOK}
				okButtonProps={{
					loading: loading || roleLoading,
				}}>
				<Form form={form}>
					<Form.Item
						hidden
						label='用户id'
						name='userid'
						initialValue={props.record.id}>
						<Input />
					</Form.Item>
					<Form.Item
						label='角色'
						name='roleid'
						rules={[
							{
								required: true,
								message: '请选择角色',
							},
						]}>
						<Select loading={loading}>
							{loading ? null : (
								<>
									{data === undefined
										? null
										: data.list.map((role) => (
												<Option value={role.id}>
													{role.rolename}
												</Option>
										  ))}
								</>
							)}
						</Select>
					</Form.Item>
					<Form.Item
						label='工资'
						name='salary'
						rules={[
							{
								required: true,
								message: '请输入工资',
							},
						]}>
						<InputNumber />
					</Form.Item>
				</Form>
			</Modal>
			<A handleClick={openModal}>雇佣</A>
		</>
	);
};
export default memo(Employ);
