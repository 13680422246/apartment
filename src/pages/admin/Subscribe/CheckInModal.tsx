import React, { memo, useCallback } from 'react';
import { A } from '../../../components';
import { Modal, Form, Input, InputNumber } from 'antd';
import useDispatch from '../../../components/EditableTableForm/store/dispatch';
import { useRequest, useToggle } from '../../../js';
import moment from 'moment';

interface IPros {
	text: string;
	record: any;
}
const defaultProps = {};
const CheckInModal: React.FC<IPros> = (props) => {
	const dispatch = useDispatch();
	const { visible, toggle } = useToggle();
	const [form] = Form.useForm();

	/**
	 * 提交入住表单
	 */
	const { run } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{
			id: number; // 这是预约表单的id
			userid: number;
			roomid: number;
			checkintime: string;
			remark: string;
			durationtime: number;
		}
	>('/admin/contract/add', {
		onSuccess: ({ data, Hint }) => {
			if (data.type === 'error') {
				Hint({
					type: 'error',
					content: data.msg,
				});
			} else {
				Hint({
					type: 'success',
					content: '入住成功',
				});
				// TODO: 更改预约表单
				// dispatch.setData
			}
		},
	});

	// 判断状态是否为预定中
	const status: number = props.record.status || 0;
	const isSubscribeIng = status === 0;

	/**
	 * 点击确认按钮
	 */
	const handleOK = useCallback(() => {
		form.validateFields().then((rows) => {
			dispatch.setLoading(true);
			try {
				run({
					id: props.record.id,
					userid: props.record.userid,
					roomid: props.record.roomid,
					checkintime: moment(props.record.checkintime).format(
						'YYYY-MM-DD'
					),
					remark: rows.remark,
					durationtime: 1,
				}).then(() => {
					dispatch.setLoading(false);
					dispatch.setData((datasource: any[]) => {
						const newData = [...datasource];
						const index = newData.findIndex(
							(item) => item.id === props.record.id
						);
						newData[index].status = '1';
						return newData;
					});
				});
			} catch (e) {
				dispatch.setLoading(false);
			}
		});
	}, [dispatch, form, props.record, run]);

	return (
		<>
			<Modal
				title='签订合同'
				visible={visible}
				onOk={handleOK}
				onCancel={toggle}>
				<Form form={form}>
					<Form.Item
						label='租约时长'
						name='durationtime'
						rules={[
							{
								required: true,
								message: '租约时长不能为空',
							},
						]}>
						<InputNumber />
					</Form.Item>
					<Form.Item label='备注信息'>
						<Input.TextArea rows={4}></Input.TextArea>
					</Form.Item>
				</Form>
			</Modal>
			<A disable={!isSubscribeIng} handleClick={toggle}>
				入住操作
			</A>
		</>
	);
};
CheckInModal.defaultProps = defaultProps;
export default memo(CheckInModal);
