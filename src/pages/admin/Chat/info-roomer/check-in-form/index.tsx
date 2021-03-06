import { useCallback, memo } from 'react';
import { Modal, Form, DatePicker, Input, InputNumber } from 'antd';
import moment from 'moment';
import useRequestCheckInForm from './useRequestCheckInForm';

/**
 * 入住表单
 */
interface IPros {
	visible: boolean; // 是否显示表单
	userid: number; // 用户id
	toggle: () => void;
}
const CheckInForm: React.FC<IPros> = (props) => {
	const [form] = Form.useForm();
	/**
	 * 只能选择今天和未来七天
	 * @param current 今天的日期
	 */
	const disabledDate = useCallback((current: any) => {
		return (
			current < moment().add(-1, 'day') ||
			current > moment().add(7, 'day')
		);
	}, []);
	/**
	 * 提交预约入住表单
	 */
	const { run, loading } = useRequestCheckInForm();
	/**
	 * 点击确定按钮
	 */
	const handleOk = useCallback(() => {
		form.validateFields().then((row) => {
			const { userid, roomid, checkintime, remark } = row;
			run({
				userid,
				roomid,
				remark,
				checkintime: checkintime.format('YYYY-MM-DD'),
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form]);
	return (
		<Modal
			title='填写入住信息'
			visible={props.visible}
			onOk={handleOk}
			onCancel={props.toggle}
			okButtonProps={{
				loading: loading,
			}}>
			<Form form={form}>
				<Form.Item hidden name='userid' initialValue={props.userid}>
					<InputNumber />
				</Form.Item>
				<Form.Item
					label='房间id'
					name='roomid'
					rules={[
						{
							required: true,
							message: '房间id不能为空',
						},
					]}>
					<InputNumber />
				</Form.Item>
				<Form.Item
					label='预约入住时间'
					name='checkintime'
					rules={[
						{
							required: true,
							message: '预约入住时间不能为空',
						},
					]}>
					<DatePicker disabledDate={disabledDate} />
				</Form.Item>
				<Form.Item label='备注' name='remark'>
					<Input.TextArea rows={4} />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default memo(CheckInForm);
