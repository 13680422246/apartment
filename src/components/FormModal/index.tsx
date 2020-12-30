import React, { memo, useCallback, useState } from 'react';
import { Modal, Form } from 'antd';
import A from '../A';

export interface IPros {
	title: string; // 标题
	component: React.ReactNode; // 点击component显示modal
	open?: () => void; // 点击component的时候触发
	callback?: (params: {
		row: any;
		setVisible: React.Dispatch<React.SetStateAction<boolean>>;
		setConfirmLoading: React.Dispatch<React.SetStateAction<boolean>>;
		resetFields: () => void;
	}) => void; // 点击modal的确认按钮执行callback
	disabled?: boolean; // 是否禁用打开modal
	okButtonDisable?: boolean; // 是否禁用确认按钮
	children: React.ReactNode;
}
const defaultProps = {
	disabled: false,
	okButtonDisable: false,
};
const FormModal: React.FC<IPros> = (props) => {
	// 是否显示modal
	const [visible, setVisible] = useState<boolean>(false);
	// 确定后，显示确定按钮为加载状态
	const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
	// 快速收集表单
	const [form] = Form.useForm();

	/**
	 * 确认按钮
	 */
	const handleOk = useCallback(() => {
		form.validateFields().then((row) => {
			props.callback &&
				props.callback({
					row,
					setVisible,
					setConfirmLoading,
					resetFields: () => {
						form.resetFields();
					},
				});
		});
	}, [form, props]);

	/**
	 * 取消按钮
	 */
	const handleCancel = useCallback(() => {
		setVisible(false);
	}, []);

	/**
	 * 单击A标签
	 */
	const handleClick = useCallback(() => {
		setVisible(true);
		props.open && props.open();
	}, [props]);

	return (
		<>
			<A disable={props.disabled} handleClick={handleClick}>
				{props.component}
			</A>
			<Modal
				title={props.title}
				visible={visible}
				centered
				confirmLoading={confirmLoading}
				okButtonProps={{
					disabled: props.okButtonDisable,
				}}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form form={form}>{props.children}</Form>
			</Modal>
		</>
	);
};
FormModal.defaultProps = defaultProps;
export default memo(FormModal);
