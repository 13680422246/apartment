import React from 'react';
import { FormModal, A } from '../../../components';
import { Form, Input } from 'antd';
import { useSelector } from '../../../components/EditableTableForm/store';
import useDispatch from '../../../components/EditableTableForm/store/dispatch';
import { useRequest } from '../../../js';

const MaintainModal = (props) => {
	const state = useSelector((store) => store.state);
	const dispatch = useDispatch();

	const { run, loading } = useRequest('/admin/maintain/add', {
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

	const callback = ({ row, setVisible, setConfirmLoading, resetFields }) => {
		run(row);
	};
	return (
		<>
			<FormModal
				disabled={dispatch.getDisable()}
				component={<A disabled={state.loading}>维修</A>}
				title={`维修${props.record.name}`}
				okButtonDisable={loading}
				callback={callback}>
				<Form.Item
					label='房间id'
					name='roomid'
					initialValue={props.record.id}>
					<Input />
				</Form.Item>
				<Form.Item
					name='remark'
					label='备注'
					extra='维修的原因'
					rules={[
						{
							required: true,
							message: '备注不能为空',
						},
					]}>
					<Input.TextArea
						rows={5}
						placeholder='备注'></Input.TextArea>
				</Form.Item>
			</FormModal>
		</>
	);
};

export default MaintainModal;
