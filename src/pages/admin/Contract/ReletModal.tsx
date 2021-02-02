import React, { memo, useCallback } from 'react';
import { Form, InputNumber } from 'antd';
import { FormModal, FormModalProps, A } from '../../../components';
import { useRequest } from '../../../js';
import useDispatch from '../../../components/EditableTableForm/store/dispatch';
import moment from 'moment';

interface IPros {
	record: any;
}
/**
 * 续租操作
 */
const ReletModal: React.FC<IPros> = (props) => {
	const dispatch = useDispatch();
	/**
	 * 请求数据
	 */
	const { run } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{
			contractid: number;
			month: number;
		}
	>('/admin/contract/relet', {
		onSuccess: ({ Hint, data }) => {
			Hint({
				type: data.type,
				content: data.type === 'error' ? data.msg : '续租成功',
			});
		},
	});
	/**
	 * 点击回调
	 */
	const callback = useCallback<NonNullable<FormModalProps['callback']>>(
		({ row, setVisible, setConfirmLoading }) => {
			setConfirmLoading(true);
			run(row)
				.then((res) => {
					if (res && res.running) {
						if (res.data && res.data.type === 'success') {
							setConfirmLoading(false);
							setVisible(false);
							// TODO: 设置数据
							dispatch.setData((datasource) => {
								const newData = [...datasource];
								const index = newData.findIndex(
									(item) => item.id === row.contractid
								);
								newData[index].durationtime =
									parseInt(newData[index].durationtime) +
									row.month;
								newData[index].remaintime =
									parseInt(newData[index].remaintime) +
									row.month;
								newData[index].remark += `${moment(
									new Date()
								).format('YYYY-MM-DD')} 续租${row.month}个月\n`;
								return newData;
							});
						}
					}
				})
				.finally(() => {
					setConfirmLoading(false);
				});
		},
		[run]
	);
	return (
		<FormModal
			title='续租'
			component={<A disable={props.record.remaintime === 0}>续租</A>}
			callback={callback}>
			<Form.Item hidden name='contractid' initialValue={props.record.id}>
				<InputNumber />
			</Form.Item>
			<Form.Item
				label='续租月份'
				name='month'
				initialValue={1}
				rules={[
					{
						required: true,
						message: '续租月份不能为空',
					},
				]}>
				<InputNumber placeholder='续租月份' />
			</Form.Item>
		</FormModal>
	);
};
export default memo(ReletModal);
